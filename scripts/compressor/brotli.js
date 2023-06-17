// https://github.com/IshIvan/shakal/blob/master/scripts/brotli.js

const compress = require('./base-compressor.js');
const brotli = require('brotli');

compress.baseCompressor(brotli.compress, {
    mode: 1,
    quality: 11,
    lgwin: 22,
}, '.br');
