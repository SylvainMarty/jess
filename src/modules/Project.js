var fs = require('fs');
const PROJECT_FILE_LOC = __dirname + '/../custom-phrases.json';

function writeSkill(customPhrases, callback) {
    console.log('Writting new sentences...');
    fs.writeFile(PROJECT_FILE_LOC, JSON.stringify(customPhrases, null, 2), function(err) {
        if (err) {
            console.error('Error while writing new serialized phrase object.');
            return callback(err);
        }

        callback(null, null);
    });
}
