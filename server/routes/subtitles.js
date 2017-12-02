const express = require('express');
const router = express.Router();
const request = require('request');
const OS = require('opensubtitles-api');
// const mkdirp = require('mkdirp');
const srt2vtt = require('srt2vtt');
const fs = require('fs');

const OpenSubtitles = new OS({
    useragent:'TemporaryUserAgent',
    username: 'kneth',
    password: 'HYPERTUBE123',
    ssl: true
});

// router.post('/', (req, res) => {
    OpenSubtitles.api.LogIn('username', 'password', 'en', 'UserAgent')
    .then(() => {
        OpenSubtitles.search({
            imdbid: 'tt0117731', //req.body.imdbid
            season: '',
            episode: ''
        }).then(subtitles => {
            console.log(subtitles);
            if (subtitles.en || subtitles.fr) {
                if (subtitles.en) {
                    request(subtitles.en.url, function (error, response, body) {
                        const name = /*req.body.imdbid + 'en';*/ 'tt0117731en';
                        const pathsrt = '../subtitles/' + name + '.srt';
                        fs.writeFile(pathsrt, body, (err) => {
                            if (err)
                                throw err;
                            else {
                                const srtData = fs.readFileSync(pathsrt);
                                srt2vtt(srtData, (err, vttData) => {
                                    const pathvtt = '../subtitles/' + name + '.vtt'
                                    if (err) throw new Error(err);
                                    fs.writeFileSync(pathvtt, vttData);
                                    fs.unlink(pathsrt, (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        }
                                    })
                                });
                            }
                        });
                    });
                }
                if (subtitles.fr) {
                    request(subtitles.fr.url, function (error, response, body) {
                        const name = /*req.body.imdbid + 'en';*/ 'tt0117731fr';
                        const pathsrt = '../subtitles/' + name + '.srt';
                        fs.writeFile(pathsrt, body, (err) => {
                            if (err)
                                throw err;
                            else {
                                const srtData = fs.readFileSync(pathsrt);
                                srt2vtt(srtData, (err, vttData) => {
                                    const pathvtt = '../subtitles/' + name + '.vtt'
                                    if (err) throw new Error(err);
                                    fs.writeFileSync(pathvtt, vttData);
                                    fs.unlink(pathsrt, (err) => {
                                        if (err) {
                                            console.log(err)
                                            res.send(err)
                                        }
                                    })
                                });
                            }
                        });
                    });
                }
            } 
            else {
                console.log("undefinedxdlol");
                return ;
            }
        })
        });
// });

// module.exports = router;