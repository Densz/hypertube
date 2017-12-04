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

const firstPromise = (req, subtitles) => {
    return new Promise((resolve, reject) => {
        request(subtitles.en.url, function (error, response, body) {
            const name = req.body.imdb + 'en';
            const pathsrt = 'subtitles/' + name + '.srt';
            fs.writeFile(pathsrt, body, (err) => {
                if (err) { reject({success : false, msg: "write file failed " + err}) }
                else {
                    const srtData = fs.readFileSync(pathsrt);
                    srt2vtt(srtData, (err, vttData) => {
                        const pathvtt = 'subtitles/' + name + '.vtt'
                        if (err)
                        throw new Error(err);
                        else {
                            fs.writeFileSync(pathvtt, vttData);
                            fs.unlink(pathsrt, (err) => {
                                if (err) {
                                    console.log(err)
                                    reject(err)
                                }
                            })
                            resolve(pathvtt);
                        }
                    });
                }
            });
        });
    })
}

const secondPromise = (req, subtitles) => {
    return new Promise((resolve, reject) => {
        request(subtitles.fr.url, function (error, response, body) {
            const name = req.body.imdb + 'fr';
            const pathsrt = 'subtitles/' + name + '.srt';
            fs.writeFile(pathsrt, body, (err) => {
                if (err) reject({success : false, msg: "write file failed " + err});
                else {
                    const srtData = fs.readFileSync(pathsrt);
                    srt2vtt(srtData, (err, vttData) => {
                        const pathvtt = 'subtitles/' + name + '.vtt'
                        if (err)
                            throw new Error(err);
                        else {
                            fs.writeFileSync(pathvtt, vttData);
                            fs.unlink(pathsrt, (err) => {
                                if (err) {
                                    console.log(err)
                                    reject(err)
                                }
                            })
                            resolve(pathvtt);
                        }
                    });
                }
            });
        });
    })
}

router.post('/', (req, res) => {
    console.log(req.body);
    OpenSubtitles.api.LogIn('username', 'password', 'en', 'UserAgent')
    .then(() => {
        OpenSubtitles.search({
            imdbid: req.body.imdb,
            season: '',
            episode: ''
        }).then(async (subtitles) => {
            console.log(subtitles);
            if (subtitles.en || subtitles.fr) {
                let Eng = undefined;
                let Fra = undefined;
                if (subtitles.en)
                    Eng = await firstPromise(req, subtitles);
                if (subtitles.fr)
                    Fra = await secondPromise(req, subtitles);
                res.json({en: Eng, fr: Fra});
            } 
            else {
                res.json({msg: 'Subtitles not found.'});
                return ;
            }
        })
    });
});

module.exports = router;