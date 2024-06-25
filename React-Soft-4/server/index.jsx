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
    db.query(`
        SELECT 
            c.idcreditos, 
            c.rotativo, 
            c.SEC, 
            c.novedades_varias, 
            c.compra_cartera, 
            u.Nombre AS nombreCredi, 
            u.Documento AS documentoCredi,
            c.seg_credito,
            c.fecha
        FROM creditos c
        INNER JOIN usuarios u ON c.usuariocredi = u.id
    `, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los datos de créditos');
        } else {
            res.send(result);
        }
    });
});

app.get("/tblobligatorios", (req, res) => {
    db.query(`
        SELECT 
            ao.idobligatorio, 
            ao.ahorro_ordinario, 
            ao.ahorro_permanente, 
            u.Nombre AS nombreUsuario, 
            u.Documento AS documentoUsuario, 
            ao.seg_ahorro_obligatorio, 
            ao.fecha
        FROM ahorros_obligatorios ao
        INNER JOIN usuarios u ON ao.usuariobli = u.id
    `, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los datos del ahorro obligatorio');
        } else {
            res.send(result);
        }
    });
});

app.get("/tblvoluntarios", (req, res) => {
    db.query(`
        SELECT av.idahorros, av.vista, av.programado, av.vacacional, av.previo_vivienda, u.Nombre, u.Documento, av.seg_ahorro_voluntario, av.fecha
        FROM ahorros_voluntarios av
        INNER JOIN usuarios u ON av.usuariovolu = u.id
    `, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al obtener los datos del ahorro voluntario');
        } else {
            res.send(result);
        }
    });
});


app.get("/creditos/:id", (req, res) => {
    const id = req.params.id;
    db.query('SELECT idcreditos, rotativo, SEC, novedades_varias, compra_cartera, usuariocredi, seg_credito, fecha FROM creditos WHERE usuariocredi = ?;',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos de creditos');
            } else {
                res.send(result);
            }
        });
});

app.get("/obligatorios/:id", (req, res) => {
    const id = req.params.id; // Obtener el id de los parámetros de ruta
    db.query('SELECT idobligatorio, ahorro_ordinario, ahorro_permanente, usuariobli, seg_ahorro_obligatorio, fecha FROM ahorros_obligatorios WHERE usuariobli = ?;',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos del ahorro obligatorio');
            } else {
                res.send(result);
            }
        });
});

app.get("/voluntarios/:id", (req, res) => {
    const id = req.params.id;
    db.query('SELECT idahorros, vista, programado, vacacional, previo_vivienda, usuariovolu, seg_ahorro_voluntario, fecha FROM ahorros_voluntarios WHERE usuariovolu = ?;',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener los datos del ahorro voluntario');
            } else {
                res.send(result);
            }
        });
});

app.put("/updateVolu", (req, res) => {
    const { idahorros, vista, programado, vacacional, previo_vivienda } = req.body;

    // Validar que todos los campos están presentes
    if (!idahorros || vista === undefined || programado === undefined || vacacional === undefined || previo_vivienda === undefined) {
        return res.status(400).send("Todos los campos son necesarios");
    }

    db.query(
        'UPDATE ahorros_voluntarios SET vista=?, programado=?, vacacional=?, previo_vivienda=? WHERE idahorros=?',
        [vista, programado, vacacional, previo_vivienda, idahorros],  // Incluye el `id` en la query
        (err, result) => {
            if (err) {
                console.error("Error en la actualización:", err);
                res.status(500).send("Error al actualizar el ahorros_voluntarios");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateOblig", (req, res) => {
    const { 
        idobligatorio, ahorro_ordinario, ahorro_permanente } = req.body;

    // Validar que todos los campos están presentes
    if (!idobligatorio || ahorro_ordinario === undefined || ahorro_permanente === undefined ) {
        return res.status(400).send("Todos los campos son necesarios");
    }

    db.query(
        'UPDATE ahorros_obligatorios SET ahorro_ordinario=?, ahorro_permanente=? WHERE idobligatorio=?',
        [ahorro_ordinario, ahorro_permanente, idobligatorio],  // Incluye el `id` en la query
        (err, result) => {
            if (err) {
                console.error("Error en la actualización:", err);
                res.status(500).send("Error al actualizar el ahorros_voluntarios");
            } else {
                res.send(result);
            }
        }
    );
});

app.put("/updateCredi", (req, res) => {
    const { idcreditos, rotativo, SEC, novedades_varias, compra_cartera } = req.body;

    // Validar que todos los campos están presentes
    if (!idcreditos || rotativo === undefined || SEC === undefined || novedades_varias === undefined || compra_cartera === undefined) {
        return res.status(400).send("Todos los campos son necesarios");
    }

    db.query(
        'UPDATE creditos SET rotativo=?, SEC=?, novedades_varias=?, compra_cartera=? WHERE idcreditos=?',
        [rotativo, SEC, novedades_varias, compra_cartera, idcreditos],  
        (err, result) => {
            if (err) {
                console.error("Error en la actualización:", err);
                res.status(500).send("Error al actualizar el ahorros_voluntarios");
            } else {
                res.send(result);
            }
        }
    );
});

app.post("/NuevoBligatorio", (req, res) => {
    const Documento = req.body.Documento;
    const benefitId = 3; // ID para ahorros obligatorios

    // Verificar si el usuario existe mediante el documento
    db.query('SELECT id FROM usuarios WHERE Documento = ?', [Documento], (err, userResult) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al buscar el usuario");
        } else if (userResult.length === 0) {
            res.status(404).send("Usuario no encontrado");
        } else {
            const userId = userResult[0].id;
            // Iniciar el proceso de vinculación al beneficio
            db.query(
                'INSERT INTO aso_bene (usuario, beneficios) VALUES (?, ?)',
                [userId, benefitId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al asociar beneficio al usuario");
                    } else {
                        db.query(
                            'INSERT INTO seg_ahorros_obligatorios (monto, usuario, beneficios, tipo_monto, fecha) VALUES (?, ?, ?, ?, NOW())',
                            [0, userId, benefitId, 'Tipo de monto'], // Modifica según tus necesidades
                            (err, segAhorrosObligatoriosResult) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Error al crear segmento de ahorro obligatorio");
                                } else {
                                    db.query(
                                        'INSERT INTO ahorros_obligatorios (ahorro_ordinario, ahorro_permanente, usuariobli, seg_ahorro_obligatorio, fecha) VALUES (?, ?, ?, ?, NOW())',
                                        [0, 0, userId, segAhorrosObligatoriosResult.insertId], // Utiliza el ID del insert en seg_ahorros_obligatorios
                                        (err, ahorrosObligatoriosResult) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send("Error al crear ahorro obligatorio asociado");
                                            } else {
                                                res.send("Beneficio asociado y ahorro obligatorio creado correctamente");
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

app.post("/NuevoVolu", (req, res) => {
    const DocumentoBli = req.body.DocumentoBli;
    const benefitId = 2; // ID para ahorros voluntarios

    // Verificar si el usuario existe mediante el documento
    db.query('SELECT id FROM usuarios WHERE Documento = ?', [DocumentoBli], (err, userResult) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al buscar el usuario");
        } else if (userResult.length === 0) {
            res.status(404).send("Usuario no encontrado");
        } else {
            const userId = userResult[0].id;
            // Iniciar el proceso de vinculación al beneficio
            db.query(
                'INSERT INTO aso_bene (usuario, beneficios) VALUES (?, ?)',
                [userId, benefitId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al asociar beneficio al usuario");
                    } else {
                        db.query(
                            'INSERT INTO seg_ahorros_voluntarios (monto, usuario, beneficios, tipo_monto, fecha) VALUES (?, ?, ?, ?, NOW())',
                            [0, userId, benefitId, 'Tipo de monto'], // Modifica según tus necesidades
                            (err, segAhorrosVoluntariosResult) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Error al crear segmento de ahorro voluntario");
                                } else {
                                    db.query(
                                        'INSERT INTO ahorros_voluntarios (vista, programado, vacacional, previo_vivienda, usuariovolu, seg_ahorro_voluntario, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                                        [0, 0, 0, 0, userId, segAhorrosVoluntariosResult.insertId], // Utiliza el ID del insert en seg_ahorros_voluntarios
                                        (err, ahorrosVoluntariosResult) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send("Error al crear ahorro voluntario asociado");
                                            } else {
                                                res.send("Beneficio asociado y ahorro voluntario creado correctamente");
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

app.post("/NuevoCredi", (req, res) => {
    const DocumentoCredi = req.body.DocumentoCredi;
    const benefitId = 1; // ID para créditos

    // Verificar si el usuario existe mediante el documento
    db.query('SELECT id FROM usuarios WHERE Documento = ?', [DocumentoCredi], (err, userResult) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al buscar el usuario");
        } else if (userResult.length === 0) {
            res.status(404).send("Usuario no encontrado");
        } else {
            const userId = userResult[0].id;
            // Iniciar el proceso de vinculación al beneficio
            db.query(
                'INSERT INTO aso_bene (usuario, beneficios) VALUES (?, ?)',
                [userId, benefitId],
                (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al asociar beneficio al usuario");
                    } else {
                        db.query(
                            'INSERT INTO seg_creditos (monto, usuario, beneficios, tipo_monto, fecha) VALUES (?, ?, ?, ?, NOW())',
                            [0, userId, benefitId, 'Tipo de monto'], // Modifica según tus necesidades
                            (err, segCreditResult) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Error al crear segmento de crédito");
                                } else {
                                    db.query(
                                        'INSERT INTO creditos (rotativo, SEC, novedades_varias, compra_cartera, usuariocredi, seg_credito, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                                        [0, 0, 0, 0, userId, segCreditResult.insertId], // Utiliza el ID del insert en seg_creditos
                                        (err, creditResult) => {
                                            if (err) {
                                                console.log(err);
                                                res.status(500).send("Error al crear crédito asociado");
                                            } else {
                                                res.send("Beneficio asociado y crédito creado correctamente");
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    });
});

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
});
