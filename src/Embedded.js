const remote = require('electron').remote;
const JEKYLL_T_NAME = "travelling-jekyll";
const JEKYLL_T_VERSION = "3.1.2b";


export = Embedded;

function Embedded() {
    return JEKYLL_T_NAME + "-" + JEKYLL_T_VERSION + getSystemName();
}

function getSystemName() {
    var platform = remote.getGlobal('os').platform,
        arch = remote.getGlobal('os').arch,
        osName = "";

    switch(platform) {
        case "win32":
            osName = "win";
            break;
        case "darwin":
            osName = "osx";
            break;
        default:
            osName = "linux";
            if(arch == "x64") {
                osName += "-x86_64";
            } else {
                osName += "-x86";
            }
            break;
    }
}