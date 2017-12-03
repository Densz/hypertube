const express = require('express');
const router = express.Router();
const request = require('request');
const OS = require('opensubtitles-api');
const srt2vtt = require('srt2vtt');
const fs = require('fs');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'kneth',
    password: 'HYPERTUBE123',
    ssl: true
});

router.post('/', (req, res) => {
    console.log(req.body);
    console.log("bitebitelolxd");
    OpenSubtitles.api.LogIn('username', 'password', 'en', 'UserAgent')
    .then(() => {
        OpenSubtitles.search({
            imdbid: req.body.imdb,
            season: '',
            episode: ''
        }).then(subtitles => {
            console.log(subtitles);
            if (subtitles.en || subtitles.fr) {
                if (subtitles.en) {
                    // console.log(subtitles.en.url);
                    request(subtitles.en.url, function (error, response, body) {
                        const name = req.body.imdb + 'en';
                        console.log(name);
                        const pathsrt = __dirname + '/subtitles/test.srt';
                        console.log(pathsrt);
                        fs.writeFile(pathsrt, body, (err) => {
                            if (err) console.log(err);
                            // else {
                            //     const srtData = fs.readFileSync(pathsrt);
                            //     srt2vtt(srtData, (err, vttData) => {
                            //         const pathvtt = '../subtitles/' + name + '.vtt'
                            //         if (err)
                            //             throw new Error(err);
                            //         else {
                            //             fs.writeFileSync(pathvtt, vttData);
                            //             fs.unlink(pathsrt, (err) => {
                            //                 if (err) {
                            //                     console.log(err)
                            //                     res.send(err)
                            //                 }
                            //             })
                            //         }
                            //     });
                            // }
                        });
                    });
                }
                // if (subtitles.fr) {
                //     request(subtitles.fr.url, function (error, response, body) {
                //         const name = req.body.imdb + 'fr';;
                //         const pathsrt = '../subtitles/' + name + '.srt';
                //         fs.writeFile(pathsrt, body, (err) => {
                //             if (err)
                //                 throw err;
                //             else {
                //                 const srtData = fs.readFileSync(pathsrt);
                //                 srt2vtt(srtData, (err, vttData) => {
                //                     const pathvtt = '../subtitles/' + name + '.vtt'
                //                     if (err) throw new Error(err);
                //                     fs.writeFileSync(pathvtt, vttData);
                //                     fs.unlink(pathsrt, (err) => {
                //                         if (err) {
                //                             console.log(err)
                //                             res.send(err)
                //                         }
                //                     })
                //                 });
                //             }
                //         });
                //     });
                // }
                res.json({ok: 'ok'});
            } 
            else {
                console.log("undefinedxdlol");
                return ;
            }
        })
    });
});

module.exports = router;