var fs = require('fs');

var google=require('./google');

// GOOGLE CREDENTIALS
var API_KEY = "API_KEY";
var SEARCH_ENGINE_ID = "SEARCH_ENGINE_ID";

// WATSON CREDENTIALS
var ENVIRONMENT_ID = "ENVIRONMENT_ID";
var COLLECTION_ID = "COLLECTION_ID";
var USERNAME = "USERNAME";
var PASSWORD = "PASSWORD";
var VERSION_DATE = "2017-11-07";

// SEARCH STRING
var SEARCH_STRING = "SEARCH_STRING";
var DESTINATION_FOLDER = "DESTINATION_FOLDER";

// KEEP FILES
var keep_files = false;

//// THE ABOVE DETAILS COULD BE PUT IN ANOTHER FILE AND COULD BE LOADED INTO APP.JS

module.exports.API_KEY = API_KEY;
module.exports.SEARCH_ENGINE_ID = SEARCH_ENGINE_ID;
module.exports.ENVIRONMENT_ID = ENVIRONMENT_ID;
module.exports.COLLECTION_ID = COLLECTION_ID;
module.exports.USERNAME = USERNAME;
module.exports.PASSWORD = PASSWORD;
module.exports.VERSION_DATE = VERSION_DATE;
module.exports.SEARCH_STRING = SEARCH_STRING;
module.exports.DESTINATION_FOLDER = DESTINATION_FOLDER;
module.exports.keep_files = keep_files;

// CHECK IF FOLDER EXISTS..IF NOT CREATE IT
fs.exists(DESTINATION_FOLDER, function (exists) {

    if (exists) {
        // console.log(exists)
    }
    else {
        fs.mkdir(DESTINATION_FOLDER)
    }

});

google.get_google_result(SEARCH_STRING);