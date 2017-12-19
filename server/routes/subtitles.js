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

const subtitlesEn = (req, subtitles, serie) => {
    return new Promise((resolve, reject) => {
        let name = "";
        if (serie)
            name = req.body.imdb + 's' + serie.season + 'e' + serie.episode + 'en';
        else
            name = req.body.imdb + 'en';
        const pathvtt = '../client/public/subtitles/' + name + '.vtt';
        if (fs.existsSync(pathvtt))
            resolve(name + '.vtt');
        else {
            request(subtitles.en.url, function (error, response, body) {
                const pathsrt = '../client/public/subtitles/' + name + '.srt';
                fs.writeFile(pathsrt, body, (err) => {
                    if (err)
                        reject({success : false, msg: "Write file failed " + err});
                    else {
                        const srtData = fs.readFileSync(pathsrt);
                        srt2vtt(srtData, (err, vttData) => {
                            if (err)
                                reject({success : false, msg: "Convertion file failed " + err});
                            else {
                                fs.writeFileSync(pathvtt, vttData);
                                fs.unlink(pathsrt, (err) => {
                                    if (err)
                                        reject({success : false, msg: "Delete file failed " + err});
                                })
                                resolve(name + '.vtt');
                            }
                        });
                    }
                });
            });
        }
    })
}

const subtitlesFr = (req, subtitles, serie) => {
    return new Promise((resolve, reject) => {
        let name = "";
        if (serie)
            name = req.body.imdb + 's' + serie.season + 'e' + serie.episode + 'fr';
        else
            name = req.body.imdb + 'fr';
        const pathvtt = '../client/public/subtitles/' + name + '.vtt';
        if (fs.existsSync(pathvtt))
            resolve(name + '.vtt');
        else {
            request(subtitles.fr.url, function (error, response, body) {
                const pathsrt = '../client/public/subtitles/' + name + '.srt';
                fs.writeFile(pathsrt, body, (err) => {
                    if (err)
                        reject({success : false, msg: "Write file failed " + err});
                    else {
                        const srtData = fs.readFileSync(pathsrt);
                        srt2vtt(srtData, (err, vttData) => {
                            if (err)
                                reject({success : false, msg: "Convertion file failed " + err});
                            else {
                                fs.writeFileSync(pathvtt, vttData);
                                fs.unlink(pathsrt, (err) => {
                                    if (err)
                                        reject({success : false, msg: "Delete file failed " + err});
                                })
                                resolve(name + '.vtt');
                            }
                        });
                    }
                });
            });
        }
    })
}

router.post('/', (req, res) => {
    OpenSubtitles.api.LogIn('username', 'password', 'en', 'UserAgent')
    .then(() => {
        if (req.body.serie) {
            OpenSubtitles.search({
                imdbid: req.body.imdb,
                season: req.body.serie.season,
                episode: req.body.serie.episode
            }).then(async (subtitles) => {
                if (subtitles.en || subtitles.fr) {
                    let Eng = undefined;
                    let Fra = undefined;
                    if (subtitles.en)
                        Eng = await subtitlesEn(req, subtitles, req.body.serie);
                    if (subtitles.fr)
                        Fra = await subtitlesFr(req, subtitles, req.body.serie);
                    res.json({en: Eng, fr: Fra});
                } 
                else {
                    res.json({msg: 'Subtitles not found.'});
                    return ;
                }
            })
        }
        else {
            OpenSubtitles.search({
                imdbid: req.body.imdb
            }).then(async (subtitles) => {
                if (subtitles.en || subtitles.fr) {
                    let Eng = undefined;
                    let Fra = undefined;
                    try {
                        if (subtitles.en)
                            Eng = await subtitlesEn(req, subtitles, undefined);
                        if (subtitles.fr)
                            Fra = await subtitlesFr(req, subtitles, undefined);
                        res.json({en: Eng, fr: Fra});
                    }
                    catch (err) {
                        console.log(err);
                        res.json({err: "error"});
                    }
                } 
                else {
                    res.json({gms: 'Subtitles not found.'});
                    return ;
                }
            })
        }
    });
});

module.exports = router;