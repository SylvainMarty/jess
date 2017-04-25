const child_process = require('child_process');
const path = require('path');
const shell = require('electron').shell;
const properties = require("../config.json");
const Embedded = require("./Embedded.js");
const Logs = require("./modules/Logs.js");


/**
 * @Vars
 */

var jekyll,
    jekyllStartBtn = document.getElementById("start-jekyll-btn"),
    jekyllStopBtn = document.getElementById("stop-jekyll-btn"),
    jekyllLogsCtnr = document.getElementById("jekyll-logs"),
    jekyllDirectoryInput = document.getElementById("jekyll-directory-input"),
    jekyllDirectoryInputWrapper = document.getElementById("jekyll-directory-input-wrapper"),
    jekyllDirectory = null,
    jekyllAccessLink = document.getElementById("jekyll-browser-access");

Logs.setLogContainer(jekyllLogsCtnr);

/**
 * @Events
 */

jekyllStartBtn.addEventListener('click', startJekyllFn);
jekyllStopBtn.addEventListener('click', stopJekyllFn);
jekyllStopBtn.addEventListener('click', stopJekyllFn);
jekyllAccessLink.addEventListener('click', goToUrl);
jekyllDirectoryInput.addEventListener('change', function(event){
    if(event.target.files && event.target.files.length > 0) {
        jekyllDirectory = event.target.files[0].path;
    }
});

/**
 * @Functions
 */
function startJekyllFn() {
    if(jekyllDirectory) {
        var binaries = properties.jekyll.binExecPath.replace("{binaryName}", Embedded());
        jekyll = child_process.spawn("./"+binaries, ['serve', '-s', jekyllDirectory, '-d', jekyllDirectory+"/_site"]);
        jekyllLogsCtnr.innerHTML = "";

        hideElement(jekyllStartBtn);
        hideElement(jekyllDirectoryInputWrapper);
        displayElement(jekyllStopBtn);
        displayElement(jekyllAccessLink);

        Logs.info('Starting Jekyll server.');

        jekyll.on('close', (code) => {
            hideElement(jekyllStopBtn);
            hideElement(jekyllAccessLink);
            displayElement(jekyllStartBtn);
            displayElement(jekyllDirectoryInputWrapper);
            if (code !== 0) {
                Logs.warn('Jekyll process exited with code '+code);
            } else {
                Logs.info('Jekyll Server stopped.');
            }
        });

        jekyll.stdout.on('data', (data) => {
            Logs.write(data.toString());
        });

        jekyll.on('error', (err) => {
            hideElement(jekyllStopBtn);
            hideElement(jekyllAccessLink);
            displayElement(jekyllStartBtn);
            displayElement(jekyllDirectoryInputWrapper);
            Logs.danger('Failed to start Jekyll Server : ' + err);
        });
    } else {
        Logs.warn("You must select a the root directory of a Jekyll project.");
    }
}

function stopJekyllFn() {
    if(jekyll) {
        jekyll.kill('SIGINT');
        jekyll = null;

        hideElement(jekyllStopBtn);
        hideElement(jekyllAccessLink);
        displayElement(jekyllStartBtn);
        displayElement(jekyllDirectoryInputWrapper);
    }
}

function displayElement(btn) {
    btn.style.display = "block";
}

function hideElement(btn) {
    btn.style.display = "none";
}

function goToUrl(event) {
    event.preventDefault();
    shell.openExternal(event.target.href);
}
