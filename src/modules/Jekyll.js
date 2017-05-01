var fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const properties = require("../properties.json");
const Embedded = require("../modules/Embedded.js");
const JEKYLL_CONF_FILE = path.join(__dirname, '../conf/jekyll-conf.json');

module.exports = Jekyll;

var local = {};

/**
 * @Constructor
 */

function Jekyll() {
    local.config = {};
    this.process = null;
    readConfigFile(function(conf){
        local.config = conf;
    });
}

/**
 * @Public methods
 */

Jekyll.prototype.getConfig = function() {
    return new Promise(
        function(resolve, reject) {
            var interval = 1000,
                ttl = 15000;
            var timer = setInterval(function() {
                if(ttl <= 0) {
                    clearInterval(timer);
                    reject();
                }
                if(local.config != null) {
                    clearInterval(timer);
                    resolve(local.config);
                } else {
                    ttl -= interval;
                }
            }, interval);
        }
    );
}

Jekyll.prototype.configure = function(newConf){
    return new Promise(
        function(resolve, reject) {
            var interval = 1000,
                ttl = 20000;

            fs.writeFile(JEKYLL_CONF_FILE, JSON.stringify(newConf, null, 4), function(err) {
                if (err) {
                    console.error('Error while writing new Jekyll serialized configuration.', err);
                    reject(err);
                }
                resolve(newConf);
            });

            var timer = setInterval(function() {
                if(ttl <= 0) {
                    clearInterval(timer);
                    reject();
                }
                ttl -= interval;
            }, interval);
        }
    );
};

Jekyll.prototype.serve = function(directory) {
    var binaries = properties.jekyll.binExecPath.replace("{binaryName}", Embedded());
    this.process = child_process.spawn("./"+binaries, buildArgs(directory));
}

Jekyll.prototype.stop = function() {
    this.process.kill('SIGINT');
}

/**
 * @Private methods
 */

function buildArgs(directory) {
    var args = ["serve", "-s", directory, "-d", directory+"/_site"];
    Object.keys(local.config).forEach(function(arg){
        args.push("--"+arg);
        args.push(local.config[arg]);
    });
    return args;
}

function readConfigFile(callback) {
    fs.readFile(JEKYLL_CONF_FILE, function(err, data) {
        if (err) {
            console.error('Error loading custom phrase JSON into memory.', err);
            return callback(null);
        }
        callback(JSON.parse(data.toString()));
    });
}
