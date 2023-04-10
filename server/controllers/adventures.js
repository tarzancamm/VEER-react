const {Adventure} = require('../util/models')

module.exports = {
    getAllAdventures: async (req, res) => {
        try {
            let adventures = await Adventure.findAll()

            res.status(200).send({
                adventures: adventures,
            })
        } catch {

        }
    },

    addAdventure: async (req, res) => {
        try {
            let {title, cost, description, latitude, longitude, userId} = req.body
           let newAdventure = await Adventure.create({
                name: title,
                cost,
                description,
                latitude,
                longitude,
                userId
            })
            console.log(newAdventure)
            res.sendStatus(200)
        } catch (err) {
            console.log("Error adding new adventure")
            console.log(err)
            res.sendStatus(400)
        }
    }
}