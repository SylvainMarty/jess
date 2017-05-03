const Vue = require('vue/dist/vue.common');
const fs = require("fs");
const path = require('path');
const url = require('url');
const targz = require("targz");
const rmdir = require('rimraf');
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

    var osBinariesArchives = getArchivesReady();

    if (!fs.existsSync(binRootPath) && osBinariesArchives.length > 0) {

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
                osBinariesArchives.forEach(function(archive) {
                    // decompress files from tar.gz archive
                    targz.decompress({
                        src: archive.path,
                        dest: path.join(_ROOT_, properties.jekyll.binRootPath)
                    }, function(err){
                        if(err) {
                            self.logs.push(Logs.warn("Jekyll for " +archive.os+ " : " +err.stack));
                        } else {
                            self.logs.push(Logs.info("Jekyll for "+archive.os+" extracted !"));
                        }
                        extractedCount++;
                    });
                });
                var timer = setInterval(function() {
                    if(ttl <= 0) {
                        document.getElementById("extr-spinner").style.display = "none";
                        clearInterval(timer);
                        reject();
                    }
                    if(extractedCount == osBinariesArchives.length) {
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
            self.logs.push(Logs.info("Dependencies integrity checkup..."));
            fs.readdir(binRootPath, function(err, files) {
                if (!err) {
                   if (files.length != osBinariesArchives.length) {
                       // directory appears to be empty
                       rmdir(binRootPath, function(error){
                           self.logs.push(Logs.danger("Integrity violation... Installation cancelled."));
                       });
                   } else {
                       self.logs.push(Logs.success("Installation done ! Redirecting..."));
                       setTimeout(function(){
                           remote.getGlobal('mainWindow').loadURL(url.format({
                               pathname: path.join(_ROOT_, "index.html"),
                               protocol: 'file:',
                               slashes: true
                           }));
                       }, 2000);
                   }
               } else {
                   self.logs.push(Logs.danger("Checkup failed... embedded/jekyll directory not found."));
               }
            });
        }).catch(function(){
            self.logs.push(Logs.danger("Installation failed... To much time needed to extract packages."));
        });
    } else {
        self.logs.push(Logs.danger("Installation failed... No Jekyll archives found."));
    }
}

/**
 * Check and returns the archives that are present in packaging/ directory
 */
function getArchivesReady() {
    var osBinariesArchives = [];
    properties.jekyll.supportedOs.forEach(function(row) {
        var archive = properties.jekyll.packagePath.replace("{os}", row);
        if(fs.existsSync(archive)) {
            osBinariesArchives.push({
                os: row,
                file: archive,
                path: path.join(_ROOT_, archive)
            });
        }
    });
    return osBinariesArchives;
}
