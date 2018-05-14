var Client = require('ftp');
var fs = require('fs');
var path = require('path');

var c = new Client();

const config = {
    host: '115.29.241.119',
    port: '79',
    user: 'daolibaba',
    password: '123456'
};
c.connect(config);

var walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};


/**
 * 貌似list会多循环  以后再改吧
 * 感觉node速度不如shell快
 */
c.on('ready', function () {
    c.list(function (err, list) {
        if (err) throw err;
        list.forEach(function (file) {
          console.log(file.name)
            if(file.name.indexOf('htaccess')<0){
              c.delete('./' + file.name, function () {
                if (err) throw err;
              })
            }

        });
        var tpath = path.resolve(__dirname, '..') + "/daolibaba-client/dist";

        walk(tpath, function (err, results) {
            if (err) throw err;
            results.forEach(function (filename) {
                (function (filename) {
                    'use strict';
                    var spath = filename.replace(/E:\\daolibaba\\daolibaba-client\\dist\\/g, "");

                    c.put(filename, spath, function (err) {
                        if (err) throw err;
                        console.dir("上传文件" + spath);
                        c.end();
                    });
                })(filename)
            });
        });

    });

});

