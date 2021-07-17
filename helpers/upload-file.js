const path = require('path');

const { v4: uuidv4 } = require('uuid');

const uploadFileHelper = (files, extensions = ['png', 'jpg', 'jpeg', 'gif'], folderName = '') => {
    return new Promise((resolve, reject) => {

        if (!files || Object.keys(files).length === 0 || !files.file) {
            return reject('There are no files in the request');
        }

        const { file } = files;

        const extension = file.name.substring(file.name.lastIndexOf('.') + 1);

        if (!extensions.includes(extension)) {
            return reject(`The extension ${extension} is invalid`);
        }

        const tempName = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/', folderName, tempName);

        file.mv(uploadPath, (error) => {
            if (error) {
                return reject(error);
            }

            resolve({ message: `File uploaded: ${tempName}`, name: tempName });
        });
    })
}

module.exports = {
    uploadFileHelper
}