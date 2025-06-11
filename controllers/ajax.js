
const { Running_text, Foto, Video, sequelize } = require('../models');
const path = require('path');
const fs = require('fs');

module.exports = {
    getRunningText: async (req, res) => {

        const data = await Running_text.findOne({
            where: {
                id: 1
            },
            attributes: ['message']
        });
      return res.json(data);
    },
    updateRunningText: async (req, res) => {
        const { message } = req.body;
        const data = await Running_text.update(
            { message },
            {
                where: {
                    id: 1
                }
            }
        );
      return  res.json(data);
    },
    addImage: async (req, res) => {
        const body = req.body;
        console.log(req.files);
        let t = await sequelize.transaction();
        try {
            let url = [];
            for (let file of req.files) {
                console.log(file);
                let isExist = await Foto.findOne({
                    where: {
                        url: file.filename
                    }
                }, { transaction: t });
                if (isExist) {
                    continue; // Skip if the image already exists
                }
                await Foto.create({
                    url: file.filename
                }, { transaction: t });
                url.push(file.filename);
            }
            await t.commit();
            return res.json({ message: 'Images added successfully', url: url});
        } catch (error) {
            console.log(error);
            await t.rollback();
            return   res.status(500).json({ error: 'Failed to add images' });
        }
    },
    getImage: async (req, res) => {
        const data = await Foto.findAll({
            attributes: ['url']
        });
        return res.json(data);
    },
    delImage: async (req, res) => {
        let t = await sequelize.transaction();
        try{
            const data = await Foto.destroy({
                where: {
                    url: req.body.url
                }
            });
            fs.unlinkSync(path.join(__dirname, '../public/cache', req.body.url));
            t.commit();
            return res.json(data);
        }
        catch (error) {
            console.log(error);
            await t.rollback();
            return res.status(501).json({ error: 'Failed to delete image' });
        }
       
    },
    getVideo: async (req, res) => {
        const data = await Video.findAll({
            attributes: ['url']
        });
        return res.json(data);
    },
    delVideo: async (req, res) => {
        let t = await sequelize.transaction();
        try {
            const data = await Video.destroy({
                where: {
                    url: req.body.url
                }
            });
            fs.unlinkSync(path.join(__dirname, '../public/cache', req.body.url));
            await t.commit();
            return res.json(data);
        } catch (error) {
            console.log(error);
            await t.rollback();
            return res.status(501).json({ error: 'Failed to delete video' });
        }
    },
    addVideo: async (req, res) => {
        const body = req.body;
        console.log(req.files);
        let t = await sequelize.transaction();
        try {
            let url = [];
            for (let file of req.files) {
                console.log(file);
                let isExist = await Video.findOne({
                    where: {
                        url: file.filename
                    }
                }, { transaction: t });
                if (isExist) {
                    continue; // Skip if the image already exists
                }
                await Video.create({
                    url: file.filename
                }, { transaction: t });
                url.push(file.filename);
            }
            await t.commit();
         return   res.json({ message: 'Images added successfully', url: url });
        } catch (error) {
            console.log(error);
            await t.rollback();
            return   res.status(500).json({ error: 'Failed to add images' });
        }
    },
}