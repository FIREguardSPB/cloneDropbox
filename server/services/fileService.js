const fs = require('fs');
const File = require('../models/File')
const config = require('config')

class FileService {
    createDir(file) {
        const filePath = `${config.get('filePath')}/${file.user}/${file.path}`
        return new Promise((resolve, reject) => {
            try {
                //если файл по пути существует, то создаем папку
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: "Файл создан"})

                } else {
                    return reject({message: "Файл уже существует"})
                }

            } catch (e) {

                return reject({message: "File error"})


            }

        })


    }
}

module.exports = new FileService()