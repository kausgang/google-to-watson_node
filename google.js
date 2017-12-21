var https = require('https');
var path = require('path');

// FOR API_KEY & SEARCH_ENGINE_ID
var app = require('./app');
// FOR CALLING VISITURL JS
var visiturl = require('./visiturl');

module.exports.get_google_result = function (SEARCH_STRING) {

    var API_KEY = app.API_KEY;
    var SEARCH_ENGINE_ID = app.SEARCH_ENGINE_ID;

    //NEEDED FOR CREATING FILENAME
    var foldername = app.DESTINATION_FOLDER;

    SEARCH_STRING = SEARCH_STRING.replace(/ /g, '+');

    const url =
        "https://www.googleapis.com/customsearch/v1?" +
        "key=" + API_KEY +
        "&cx=" + SEARCH_ENGINE_ID +
        "&q=" + SEARCH_STRING;

    https.get(url, function (res) {

        var body = "";
        res.on("data", function (data) {
            body += data;
        });

        res.on("end", function (){

            var google_data = JSON.parse(body);

            for (var i = 0; i < 10; i++) {

                var search_result_url = google_data.items[i].link;
                var file_format = google_data.items[i].fileFormat;

                var fileSeparator = path.sep;    // returns '\\' on windows, '/' on *nix

                if (file_format == "PDF/Adobe Acrobat") {
                    filename = foldername + fileSeparator + SEARCH_STRING + "_" + i + ".pdf"
                }
                else if(file_format == "Microsoft Word"){
                    filename = foldername + fileSeparator + SEARCH_STRING + "_" + i + ".doc"
                }
                else {
                    filename = foldername + fileSeparator + SEARCH_STRING + "_" + i + ".html";
                }

                visiturl.visiturl(search_result_url,filename);

            }
        })

    });


};
