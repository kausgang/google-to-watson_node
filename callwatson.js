
var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var extfs = require('extfs');
var fs = require('fs');

// REQUIRED TO OBTAIN CREDENTIALS
var app = require('./app')

module.exports.callwatson = function callwatson(filename) {

    var ENVIRONMENT_ID = app.ENVIRONMENT_ID;
    var COLLECTION_ID = app.COLLECTION_ID;
    var USERNAME = app.USERNAME;
    var PASSWORD = app.PASSWORD;
    var VERSION_DATE = app.VERSION_DATE;
    var keep_files = app.keep_files;


    //CHECK IF FILE IS EMPTY
    extfs.isEmpty(filename, function (empty) {

        if (empty) {
            extfs.remove(filename, function (err) {
                console.log(filename + ' removed')
            })
        }
        else {
            //UPLOAD FILE IN WATSON

            //  CREATE FILE READ STREAM
            var file = fs.createReadStream(filename);

            // DELETE THE FILES IF KEEP_FILES IS FALSE
            if (!keep_files) {
                extfs.remove(filename, function (err) {
                    console.log('file delete error ' + err);
                });
            }

            var discovery = new DiscoveryV1({
                username: USERNAME,
                password: PASSWORD,
                version_date: VERSION_DATE
            });

            var param = {
                environment_id: ENVIRONMENT_ID,
                collection_id: COLLECTION_ID,
                file: file
            };

            discovery.addDocument(
                param,
                function (error, data) {
                    //console.log(JSON.stringify(data));
                    console.log("error " + error);
                });


        }
    });

};
