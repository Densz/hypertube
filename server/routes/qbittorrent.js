const express = require('express');
const request = require('request-promise-native');
const config = require('../config/qbittorrent');

let token = request.jar();

function post(uri, data) {
    return (request.post(config.host + uri, { jar: token, form: data }));
};

function get(uri) {
    return (request.get(config.host + uri, { jar: token }));
};

function connect() {
    let credentials = {
        username: config.username,
        password: config.password
    };
    return post('login', credentials);
};

function download(hash) {
    let options = {
        'paused': 'true',
        'urls': config.site + hash
    }
    return post('command/download', options);
};

function activateSequential(hash) {
    return post('command/toggleSequentialDownload', { hashes: hash });
}

function resume(hash) {
    return post('command/resume', { hash: hash });
}

// let hash = '62AA7295177FB56FE95311E45C588821DF670F64';

addTorrent = async function(hash) {
    try {
        await connect();
        await download(hash);
        await activateSequential(hash);
        await resume(hash);
    } catch (err) { console.log(err); }
};

torrentInfo = async function(hash) {
    let status = {
        completed: -1,
        total: -1
    };
    await connect();
    let data = await get('query/getPieceStates/' + hash.toLowerCase());
    if (data) {
        data = data.replace(/[,\[\]]/g, '');
        status.total = data.length;
        let progress = data.search(/[01]/);
        status.completed = (progress === -1) ? status.total : progress;
    }
    console.log(status);    
    return status;    
};

// let hash = '62aa7295177fb56fe95311e45c588821df670f64';
addTorrent('62aa7295177fb56fe95311e45c588821df670f64');
// torrentInfo('62aa7295177fb56fe95311e45c588821df670f64');

// torrentProgress = async function(hash) {
//     await 
// }