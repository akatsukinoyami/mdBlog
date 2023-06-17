// https://github.com/IshIvan/shakal/blob/master/scripts/gzip.js

const zlib = require('zlib');
const compress = require('./base-compressor.js');

compress.baseCompressor(zlib.gzipSync, {level: 9}, '.gz');
