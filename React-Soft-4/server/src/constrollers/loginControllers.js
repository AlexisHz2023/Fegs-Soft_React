const db = require('../models/db');
const jwt = require('jsonwebtoken')

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log('Datos recibidos:', email, password);

    // Lógica para validar usuario en base de datos
    const consult = 'SELECT * FROM usuarios WHERE Correo = ? AND Clave = ?';

    try {
        db.query(consult, [email, password], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor");
            } else {
                if (result.length > 0) {
                    const { id, Nombre, Correo, Documento, rol } = result[0];
                    const token = jwt.sign(
                        { id, Nombre, Correo, Documento, rol }, //Payload del token
                        "Stack", // esta es la clave secreta
                        { expiresIn: "3m" } //tiempo del token
                    )
                    console.log('Usuario encontrado:', id, Nombre, Correo, Documento, rol);
                    res.status(200).json({ token });
                } else {
                    console.log('Credenciales inválidas');
                    res.status(401).send("Credenciales inválidas");
                }
            }
        });
    } catch (e) {
        console.log('Error en try-catch:', e);
        res.status(500).send("Error en el servidor");
    }
};


