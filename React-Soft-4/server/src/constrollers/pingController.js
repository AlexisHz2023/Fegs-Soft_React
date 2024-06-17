const db = require('../models/db')


module.exports.ping = (req, res) => {
    const consult = 'SELECT * FROM usuarios';

    try {
        db.query(consult, (err, results) => {
            console.log(results)
            res.json(results)
        });

    } catch (e) {

    }
}