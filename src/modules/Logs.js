var logContainer = null;

exports.setLogContainer = function(newContainer) {
    logContainer = newContainer;
}

exports.getLogContainer = function() {
    return logContainer;
}

exports.info = function(message) {
    return exports.write(message, "info");
}

exports.success = function(message) {
    return exports.write(message, "success");
}

exports.warn = function(message) {
    return exports.write(message, "warn");
}

exports.danger = function(message) {
    return exports.write(message, "danger");
}

exports.write = function(message, status) {
    var output = placeholderByStatus(status).replace("{msg}", message);
    if(logContainer) {
        logContainer.innerHTML += output;
    }
    return output;
}

function placeholderByStatus(status) {
    var placeholder = null;
    switch (status) {
        case "success":
            placeholder = '<li class="success"><i class="fa fa-check"></i>&nbsp; {msg}</li>';
            break;
        case "info":
            placeholder = '<li class="info"><i class="fa fa-info"></i>&nbsp; {msg}</li>';
            break;
        case "warn":
            placeholder = '<li class="warn"><i class="fa fa-exclamation"></i>&nbsp; {msg}</li>';
            break;
        case "danger":
            placeholder = '<li class="danger"><i class="fa fa-time"></i>&nbsp; {msg}</li>';
            break;
        default:
            placeholder = '<li>{msg}</li>';
            break;
    }
    return placeholder;
}
