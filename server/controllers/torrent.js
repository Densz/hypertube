const ts = require('torrent-stream');
const options = require('../config/torrent');
const mimeTypes = require('./mimeTypes');
const path = require('path');

module.exports = class Torrent {
    constructor(magnet) {
        this.engine = ts(magnet, options);
    }

    static compareSize(a, b) {
        if (a.length > b.length)
            return (-1);
        else if (a.length < b.length)
            return (1);
        return (0);
    }

    onFinished(cb) {
        this.engine.on('idle', cb);
    }

    get() {
        return new Promise((resolve, reject) => {
            let files = [],
                length = 0;

            this.engine.on('ready', () => {
                files = this.engine.files;

                length = files.length;

                if (length == 0)
                    reject(new Error('Torrent contains no files.'));

                // sort files by size in descending order, assuming largest file is the video
                files.sort(this.compareSize);

                // find largest video file and return it for use
                files.forEach((file) => {
                    if (mimeTypes[path.extname(file.path)])
                        resolve(file);
                });

                // throw error if torrent has no video files
                reject(new Error('Torrent contains no valid video file.'));
            });
        });
    }
}