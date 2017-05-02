const conf = require(process.cwd() + '/conf');
const log = require(process.cwd() + '/libs/log')(module);
const db  = require(process.cwd() + '/libs/db');

const Model  = require('../models/source');

// Источники
exports.list = () => {
    return new Promise((resolve, reject) => {
        Model.Source.find({}, (err, result) => {
            if (!err){
                if (result.length){
                    resolve(result)
                } else {
                    reject(err)
                }
            } else {
                reject(err)
            }
        })
    });
};

// Добавить новый источник
exports.create = data => {
    return new Promise((resolve, reject) => {
        let Source = new Model.Source({
            name: data.name,
            source: data.source,
            count: data.source.length
        });
        Source.save((err) => {
            if (!err){
                resolve(Source)
            } else {
                reject(err)
            }
        });
    });
};

// Проверить существование источника
exports.contains = name => {
    return new Promise((resolve, reject) => {
        Model.Source.findOne({name: name}, (err, result) => {
            if (!err){
                if (result !== null){
                    resolve(result)
                } else {
                    reject(err)
                }
            } else {
                reject(err)
            }
        })
    });
};

// Удаление
exports.remove = name => {
    return new Promise((resolve, reject) => {
        Model.Source.remove({name: name}, (err, source) => {
            if (!err){
                resolve(source)
            } else {
                reject(err)
            }
        })
    });
};