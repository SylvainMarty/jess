const Vue = require('vue/dist/vue.common');
const fs = require("fs");
const path = require('path');
const url = require('url');
const targz = require("targz");
const properties = require("../properties.json");
const Logs = require("../modules/Logs.js");
const _ROOT_ = __dirname + "/../../";
var remote = require('electron').remote;


var app = new Vue({
    el: '#app',

    data: function() {
        var self = {
            logs: []
        };

        installDependencies(self);
        return self;
    }
});



function installDependencies(self) {
    var binRootPath = path.join(_ROOT_, properties.jekyll.binRootPath);

    if (!fs.existsSync(binRootPath)) {

        try {
            self.logs.push(Logs.write("Creating the Jekyll binaries directory..."));
            fs.mkdirSync(binRootPath);
        } catch (err) {
            self.logs.push(Logs.danger("Permission denied when creating embedded/jekyll/ directory"));
        }

        self.logs.push(Logs.write("Unpackaging Jekyll binaries..."));
        var extraction = new Promise(
            function(resolve, reject) {
                var extractedCount = 0,
                    interval = 1000,
                    ttl = 60000;
                self.logs.push(Logs.write('<span id="extr-spinner"><i class="fa fa-circle-o-notch fa-spin"></i></span>'));
                properties.jekyll.supportedOs.forEach(function(row) {
                    var archive = properties.jekyll.packagePath.replace("{os}", row);

                    // decompress files from tar.gz archive
                    targz.decompress({
                        src: path.join(_ROOT_, archive),
                        dest: path.join(_ROOT_, properties.jekyll.binRootPath)
                    }, function(err){
                        if(err) {
                            self.logs.push(Logs.danger("Something goes wrong: " + err.stack));
                        } else {
                            self.logs.push(Logs.info("Jekyll for "+row+" extracted !"));
                            extractedCount++;
                        }
                    });
                });
                var timer = setInterval(function() {
                    if(ttl <= 0) {
                        document.getElementById("extr-spinner").style.display = "none";
                        clearInterval(timer);
                        reject();
                    }
                    if(extractedCount == properties.jekyll.supportedOs.length) {
                        document.getElementById("extr-spinner").style.display = "none";
                        clearInterval(timer);
                        resolve();
                    } else {
                        ttl -= interval;
                    }
                }, interval);
            }
        );

        extraction.then(function(){
            self.logs.push(Logs.success("Installation done ! Redirecting..."));
            setTimeout(function(){
                remote.getGlobal('mainWindow').loadURL(url.format({
                    pathname: path.join(_ROOT_, "index.html"),
                    protocol: 'file:',
                    slashes: true
                }));
            }, 2000);
        }).catch(function(){
            self.logs.push(Logs.danger("Installation failed... To much time needed to extract packages."));
        });
    }
}
