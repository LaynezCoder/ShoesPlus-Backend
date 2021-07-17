const validators = require('./validators');
const jwt = require('./jwt');
const uploadFile = require('./upload-file');

module.exports = {
    ...jwt,
    ...uploadFile,
    ...validators
}