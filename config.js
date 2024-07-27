// config.js

// process.env gives access to environement variables of the current process
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? '/lvl-up/' : '/';

module.exports = { isProduction, baseUrl };


