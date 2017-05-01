const Vue = require('vue/dist/vue.common');
const path = require('path');
const shell = require('electron').shell;
// const remote = require('electron').remote;
const Logs = require("../modules/Logs.js");
var Jekyll = require("../modules/Jekyll.js");

var jekyll = new Jekyll();

var app = new Vue({
    el: '#app',

    data: function() {
        var self = {
            logs: [],
            jekyllDirectory: null,
            states: {
                serverStarted: false
            }
        };

        return self;
    },

    methods: {
        startServer: startJekyllFn,
        stopServer: stopJekyllFn,
        changeServerDirectory: changeServerDirectory,
        goToBrowser: goToBrowser
    }
});



/**
 * @Functions
 */
function startJekyllFn() {
    console.log("Starting jekyll server")
    if(this.jekyllDirectory) {
        jekyll.serve(this.jekyllDirectory);
        this.logs = [];

        this.states.serverStarted = true;

        this.logs.push(Logs.info('Starting Jekyll server.'));

        jekyll.process.on('close', (code) => {
            this.states.serverStarted = false;
            if (code !== 0) {
                this.logs.push(Logs.warn('Jekyll process exited with code '+code));
            } else {
                this.logs.push(Logs.info('Jekyll Server stopped.'));
            }
        });

        jekyll.process.stdout.on('data', (data) => {
            this.logs.push(Logs.write(data.toString()));
        });

        jekyll.process.on('error', (err) => {
            this.states.serverStarted = false;
            this.logs.push(Logs.danger('Failed to start Jekyll Server : ' + err));
        });
    } else {
        this.logs.push(Logs.warn("You must select a the root directory of a Jekyll project."));
    }
}

function stopJekyllFn() {
    if(jekyll.process) {
        jekyll.stop();
        this.states.serverStarted = false;
    }
}

function goToBrowser(url) {
    shell.openExternal(url);
}

function changeServerDirectory(event){
    if(event.target.files && event.target.files.length > 0) {
        this.jekyllDirectory = event.target.files[0].path;
    }
}
