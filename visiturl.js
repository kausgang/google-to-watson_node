var https = require('https');
var http = require('http');
var fs = require("fs");
var path = require('path');

//  REQUIRED FOR CALLING CALLWATSON
var callwatson = require('./callwatson');

module.exports.visiturl = function (search_result_url, filename) {


    var client = http;

    // You can use url.protocol as well
    if (search_result_url.toString().indexOf("https") === 0) {
        client = https;
    }

    var file = fs.createWriteStream(filename);

    var req = client.request(search_result_url, function (res) {

        res.pipe(file);

        res.on('end', function () {

            file.end();
            callwatson.callwatson(filename);
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message)
    });

    req.end();

};