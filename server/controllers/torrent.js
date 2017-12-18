const ts = require('torrent-stream');
const options = require('../config/torrent');
const mimeTypes = require('./mimeTypes');
const path = require('path');

module.exports = class Torrent {
    constructor(magnet) {
        this.engine = ts(magnet, options);
        // this.engine.on('download', function(pieceIndex) {
        //     console.log("Piece " + pieceIndex + " downloaded.");
        // });
    }

    static compareSize(a, b) {
        if (a.length > b.length)
            return (-1);
        else if (a.length < b.length)
            return (1);
        return (0);
    }

    onFinished(cb) {
        this.engine.on('idle', () => {
            cb();
            // this.engine.destroy();
        });
    }

    deleteData(cb) {
        this.engine.remove(null, cb);
    }

    getVideo() {
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
					console.log(file.path);
                    let ext = path.extname(file.path)
					if (mimeTypes[ext]) {
						console.log([ext]);
						resolve({ file: file, ext: ext });
					}
                });

                // throw error if torrent has no video files
                reject(new Error('Torrent contains no valid video file.'));
            });
        });
    }
}