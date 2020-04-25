var sanitize = require('validator').sanitize

// edit

function conformQuestion(question) {
    return question ? sanitize(question).xss() : "";
};


var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
var vcap_application = JSON.parse(process.env.VCAP_APPLICATION);

function getRabbitUrl(rabbitServiceName) {
    return vcap_services['cloudamqp-n/a'][0]['credentials']['uri'];
}


function getMongoUrl(dbServiceName) {
    return vcap_services['mongolab-n/a'][0]['credentials']['uri'];
}

function getServerId() {
    return vcap_application['ServerId'];
}

exports.getRabbitUrl = getRabbitUrl;
exports.getMongoUrl = getMongoUrl;
exports.getServerId = getServerId;
exports.conformQuestion = conformQuestion;
