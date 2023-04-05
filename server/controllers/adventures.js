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

        } catch {
            
        }
    }
}