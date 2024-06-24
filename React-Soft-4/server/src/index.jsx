const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fegs-soft-react"
});

app.post("/create", (req, res) => {
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Documento = req.body.Documento;
    const Clave = req.body.Clave;
    const rol = req.body.rol;

    db.query(
        'INSERT INTO usuarios(Nombre, Correo, Documento, Clave, rol) VALUES (?, ?, ?, ?, ?)',
        [Nombre, Correo, Documento, Clave, rol],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al crear usuario");
            } else {
                res.send(result);
            }
        }
    );
});






app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE Correo = ? AND Clave = ?',
        [email, password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor");
            } else {
                if (result.length > 0) {

                        const user = {
                            id: result[0].id,
                            Nombre: result[0].Nombre,
                            Correo: result[0].Correo,
                            Documento: result[0].Documento,
                            rol: result[0].rol
                        };
                        return res.status(200).json({ message: 'Inicio de sesión exitoso', user });

                } else {
                    return res.status(401).send("Credenciales inválidas");
                }
            }
        }
    );
});

app.get("/usuarios", (req, res) => {
    db.query('SELECT id, Nombre, Correo, Documento, rol FROM usuarios WHERE rol = 2',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener asesoras');
            } else {
                res.send(result);
            }
        });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Documento = req.body.Documento;
    const rol = req.body.rol;

    db.query(
        'UPDATE usuarios SET Nombre=?, Correo=?, Documento=?, rol=? WHERE id=?',
        [Nombre, Correo, Documento, rol, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateaso", (req, res) => {
    const id = req.body.id;
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Documento = req.body.Documento;


    db.query(
        'UPDATE usuarios SET Nombre=?, Correo=?, Documento=? WHERE id=?',
        [Nombre, Correo, Documento, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar el usuario");
            } else {
                res.send(result);
            }
        }
    );
});


app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        'DELETE FROM usuarios WHERE id=?', id,
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

// app.get("/beneficios", (req, res) => {
//     db.query('SELECT idbeneficios, tipos_beneficios FROM usuarios',
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Error al obtener beneficios');
//             } else {
//                 res.send(result);
//             }
//         });
// });

// app.get("/creditos", (req, res) => {
//     db.query('SELECT idbeneficios, tipos_beneficios FROM usuarios',
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Error al obtener beneficios');
//             } else {
//                 res.send(result);
//             }
//         });
// });


app.get("/asociados", (req, res) => {
    db.query('SELECT id, Nombre, Correo, Documento FROM usuarios WHERE rol = 3',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener asociados');
            } else {
                res.send(result);
            }
        });
});

app.get("/tblcreditos", (req, res) => {
    db.query('SELECT idcreditos, rotativo, SEC, novedades_varias, compra_cartera, usuariocredi, seg_credito, fecha FROM creditos',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos de creditos');
            } else {
                res.send(result);
            }
        });
});

app.get("/tblobligatorios", (req, res) => {
    db.query('SELECT idobligatorio, ahorro_ordinario, ahorro_permanente, usuariobli, seg_ahorro_obligatorio, fecha FROM ahorros_obligatorios ',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos del ahorro obligatorio');
            } else {
                res.send(result);
            }
        });
});

app.get("/tblvoluntarios", (req, res) => {
    db.query('SELECT idahorros, vista, programado, vacacional, previo_vivienda, usuariovolu, seg_ahorro_voluntario, fecha FROM ahorros_voluntarios',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos del ahorro voluntario');
            } else {
                res.send(result);
            }
        });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
});