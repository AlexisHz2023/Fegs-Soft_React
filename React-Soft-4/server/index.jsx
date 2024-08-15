const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fegs-soft-react"
});

app.post("/create", async (req, res) => {
    const { Nombre, Correo, Documento, Clave, rol } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(Clave, saltRounds);

        db.query(
            'SELECT * FROM usuarios WHERE Correo = ? OR Documento = ?',
            [Correo, Documento],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error en el servidor");
                } else if (result.length > 0) {
                    res.status(400).send("Correo o Documento ya existen");
                } else {
                    db.query(
                        'INSERT INTO usuarios (Nombre, Correo, Documento, Clave, rol) VALUES (?, ?, ?, ?, ?)',
                        [Nombre, Correo, Documento, hashedPassword, rol],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Error al crear usuario");
                            } else {
                                res.send(result);
                            }
                        }
                    );
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE Correo = ?',
        [email],
        async (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error en el servidor");
            } else {
                if (result.length > 0) {
                    // Compara la contraseña ingresada con la encriptada
                    const match = await bcrypt.compare(password, result[0].Clave);
                    if (match) {
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
                } else {
                    return res.status(401).send("Credenciales inválidas");
                }
            }
        }
    );
});



app.put("/update", (req, res) => {
    const { id, Nombre, Correo, Documento } = req.body;
        console.log("Paso aqui")
    try {
        db.query(
            'SELECT * FROM usuarios WHERE (Correo = ? OR Documento = ?) AND id != ?',
            [Correo, Documento, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error en el servidor");
                } else if (result.length > 0) {
                    res.status(400).send("Correo o Documento ya existen");
                } else {
                    db.query(
                        'UPDATE usuarios SET Nombre=?, Correo=?, Documento=? WHERE id=?',
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
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

app.put("/updateaso", (req, res) => {
    const { id, Nombre, Correo, Documento } = req.body;

    try {
        db.query(
            'SELECT * FROM usuarios WHERE (Correo = ? OR Documento = ?) AND id != ?',
            [Correo, Documento, id],
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error en el servidor");
                } else if (result.length > 0) {
                    res.status(400).send("Correo o Documento ya existen");
                } else {
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
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
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

    try {
        if (!idahorros || vista === undefined || programado === undefined || vacacional === undefined || previo_vivienda === undefined) {
            return res.status(400).send("Todos los campos son necesarios");
        }

        // Primero, obtenemos los valores actuales de la base de datos
        db.query(
            'SELECT vista, programado, vacacional, previo_vivienda FROM ahorros_voluntarios WHERE idahorros = ?',
            [idahorros],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en el servidor al obtener los valores actuales");
                }

                if (result.length === 0) {
                    return res.status(404).send("No se encontró el registro de ahorros_voluntarios");
                }

                // Convertimos los valores actuales y los nuevos a números y los sumamos
                const currentValues = result[0];
                const newVista = Number(currentValues.vista) + Number(vista);
                const newProgramado = Number(currentValues.programado) + Number(programado);
                const newVacacional = Number(currentValues.vacacional) + Number(vacacional);
                const newPrevioVivienda = Number(currentValues.previo_vivienda) + Number(previo_vivienda);

                // Actualizamos la base de datos con los valores sumados
                db.query(
                    'UPDATE ahorros_voluntarios SET vista = ?, programado = ?, vacacional = ?, previo_vivienda = ? WHERE idahorros = ?',
                    [newVista, newProgramado, newVacacional, newPrevioVivienda, idahorros],
                    (err, result) => {
                        if (err) {
                            console.error("Error en la actualización:", err);
                            return res.status(500).send("Error al actualizar el ahorros_voluntarios");
                        }
                        res.send(result);
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

app.put("/updateOblig", (req, res) => {
    const { idobligatorio, ahorro_ordinario, ahorro_permanente } = req.body;

    try {
        if (!idobligatorio || ahorro_ordinario === undefined || ahorro_permanente === undefined) {
            return res.status(400).send("Todos los campos son necesarios");
        }

        // Primero, obtenemos los valores actuales de la base de datos
        db.query(
            'SELECT ahorro_ordinario, ahorro_permanente FROM ahorros_obligatorios WHERE idobligatorio = ?',
            [idobligatorio],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en el servidor al obtener los valores actuales");
                }

                if (result.length === 0) {
                    return res.status(404).send("No se encontró el registro de ahorros_obligatorios");
                }

                // Convertimos los valores actuales y los nuevos a números y los sumamos
                const currentValues = result[0];
                const newAhorroOrdinario = Number(currentValues.ahorro_ordinario) + Number(ahorro_ordinario);
                const newAhorroPermanente = Number(currentValues.ahorro_permanente) + Number(ahorro_permanente);

                // Actualizamos la base de datos con los valores sumados
                db.query(
                    'UPDATE ahorros_obligatorios SET ahorro_ordinario = ?, ahorro_permanente = ? WHERE idobligatorio = ?',
                    [newAhorroOrdinario, newAhorroPermanente, idobligatorio],
                    (err, result) => {
                        if (err) {
                            console.error("Error en la actualización:", err);
                            return res.status(500).send("Error al actualizar el ahorros_obligatorios");
                        }
                        res.send(result);
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});


app.put("/updateCredi", (req, res) => {
    const { idcreditos, rotativo, SEC, novedades_varias, compra_cartera } = req.body;

    try {
        if (!idcreditos || rotativo === undefined || SEC === undefined || novedades_varias === undefined || compra_cartera === undefined) {
            return res.status(400).send("Todos los campos son necesarios");
        }

        // Primero, obtenemos los valores actuales de la base de datos
        db.query(
            'SELECT rotativo, SEC, novedades_varias, compra_cartera FROM creditos WHERE idcreditos = ?',
            [idcreditos],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en el servidor al obtener los valores actuales");
                }

                if (result.length === 0) {
                    return res.status(404).send("No se encontró el registro de creditos");
                }

                // Convertimos los valores actuales y los nuevos a números y los sumamos
                const currentValues = result[0];
                const newRotativo = Number(currentValues.rotativo) + Number(rotativo);
                const newSEC = Number(currentValues.SEC) + Number(SEC);
                const newNovedadesVarias = Number(currentValues.novedades_varias) + Number(novedades_varias);
                const newCompraCartera = Number(currentValues.compra_cartera) + Number(compra_cartera);

                // Actualizamos la base de datos con los valores sumados
                db.query(
                    'UPDATE creditos SET rotativo = ?, SEC = ?, novedades_varias = ?, compra_cartera = ? WHERE idcreditos = ?',
                    [newRotativo, newSEC, newNovedadesVarias, newCompraCartera, idcreditos],
                    (err, result) => {
                        if (err) {
                            console.error("Error en la actualización:", err);
                            return res.status(500).send("Error al actualizar el creditos");
                        }
                        res.send(result);
                    }
                );
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
});

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


app.post("/NuevoObligatorio", (req, res) => {
    const Documento = req.body.Documento;
    const benefitId = 3; // ID para ahorros obligatorios

    try {
        // Verificar si el usuario existe
        db.query('SELECT id FROM usuarios WHERE Documento = ?', [Documento], (err, userResult) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al buscar el usuario");
            } else if (userResult.length === 0) {
                res.status(404).send("Usuario no encontrado");
            } else {
                const userId = userResult[0].id;

                // Verificar si ya existe en ahorros obligatorios
                db.query('SELECT * FROM ahorros_obligatorios WHERE usuariobli = ?', [userId], (err, obligResult) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al buscar ahorros obligatorios");
                    } else if (obligResult.length > 0) {
                        res.status(400).send("El usuario ya tiene un ahorro obligatorio asociado");
                    } else {
                        // Verificar si ya existe en aso_bene
                        db.query('SELECT * FROM aso_bene WHERE usuario = ? AND beneficios = ?', [userId, benefitId], (err, asoBeneResult) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Error al verificar beneficio asociado");
                            } else if (asoBeneResult.length > 0) {
                                res.status(400).send("El usuario ya tiene este beneficio asociado");
                            } else {
                                // Insertar en aso_bene
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
                                                [0, userId, benefitId, 'Tipo de monto'],
                                                (err, segAhorrosObligatoriosResult) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(500).send("Error al crear segmento de ahorro obligatorio");
                                                    } else {
                                                        db.query(
                                                            'INSERT INTO ahorros_obligatorios (ahorro_ordinario, ahorro_permanente, usuariobli, seg_ahorro_obligatorio, fecha) VALUES (?, ?, ?, ?, NOW())',
                                                            [0, 0, userId, segAhorrosObligatoriosResult.insertId],
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
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
});

app.post("/NuevoVolu", (req, res) => {
    const DocumentoBli = req.body.DocumentoBli;
    const benefitId = 2; // ID para ahorros voluntarios

    try {
        // Verificar si el usuario existe
        db.query('SELECT id FROM usuarios WHERE Documento = ?', [DocumentoBli], (err, userResult) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al buscar el usuario");
            } else if (userResult.length === 0) {
                res.status(404).send("Usuario no encontrado");
            } else {
                const userId = userResult[0].id;

                // Verificar si ya existe en ahorros voluntarios
                db.query('SELECT * FROM ahorros_voluntarios WHERE usuariovolu = ?', [userId], (err, voluResult) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al buscar ahorros voluntarios");
                    } else if (voluResult.length > 0) {
                        res.status(400).send("El usuario ya tiene un ahorro voluntario asociado");
                    } else {
                        // Verificar si ya existe en aso_bene
                        db.query('SELECT * FROM aso_bene WHERE usuario = ? AND beneficios = ?', [userId, benefitId], (err, asoBeneResult) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Error al verificar beneficio asociado");
                            } else if (asoBeneResult.length > 0) {
                                res.status(400).send("El usuario ya tiene este beneficio asociado");
                            } else {
                                // Insertar en aso_bene
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
                                                [0, userId, benefitId, 'Tipo de monto'],
                                                (err, segAhorrosVoluntariosResult) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(500).send("Error al crear segmento de ahorro voluntario");
                                                    } else {
                                                        db.query(
                                                            'INSERT INTO ahorros_voluntarios (vista, programado, vacacional, previo_vivienda, usuariovolu, seg_ahorro_voluntario, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                                                            [0, 0, 0, 0, userId, segAhorrosVoluntariosResult.insertId],
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
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
});

app.post("/NuevoCredi", (req, res) => {
    const DocumentoCredi = req.body.DocumentoCredi;
    const benefitId = 1; // ID para créditos

    try {
        // Verificar si el usuario existe
        db.query('SELECT id FROM usuarios WHERE Documento = ?', [DocumentoCredi], (err, userResult) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al buscar el usuario");
            } else if (userResult.length === 0) {
                res.status(404).send("Usuario no encontrado");
            } else {
                const userId = userResult[0].id;

                // Verificar si ya existe en créditos
                db.query('SELECT * FROM creditos WHERE usuariocredi = ?', [userId], (err, credResult) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error al buscar créditos");
                    } else if (credResult.length > 0) {
                        res.status(400).send("El usuario ya tiene un crédito asociado");
                    } else {
                        // Verificar si ya existe en aso_bene
                        db.query('SELECT * FROM aso_bene WHERE usuario = ? AND beneficios = ?', [userId, benefitId], (err, asoBeneResult) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send("Error al verificar beneficio asociado");
                            } else if (asoBeneResult.length > 0) {
                                res.status(400).send("El usuario ya tiene este beneficio asociado");
                            } else {
                                // Insertar en aso_bene
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
                                                [0, userId, benefitId, 'Tipo de monto'],
                                                (err, segCreditResult) => {
                                                    if (err) {
                                                        console.log(err);
                                                        res.status(500).send("Error al crear segmento de crédito");
                                                    } else {
                                                        db.query(
                                                            'INSERT INTO creditos (rotativo, SEC, novedades_varias, compra_cartera, usuariocredi, seg_credito, fecha) VALUES (?, ?, ?, ?, ?, ?, NOW())',
                                                            [0, 0, 0, 0, userId, segCreditResult.insertId],
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
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error en el servidor");
    }
});

app.post("/NuevoBeneficio", (req, res) => {
    const { Documento, benefitId } = req.body;    
    
    // console.log("Datos recibidos en el servidor:", req.body);

    const documentoNumber = Number(Documento);
    const benefitIdNumber = Number(benefitId);
    

    if (isNaN(documentoNumber) || isNaN(benefitIdNumber)) {
      return res.status(400).send("Documento o benefitId no es un número válido");
    }
    // console.log("Datos recibidos:", benefitIdNumber, documentoNumber);
  
    let tablaAhorro, campoUsuario, campoSegAhorro, tablaSegAhorro, camposSegAhorro, camposAhorro, mensajeErrorAhorro;
  
    switch (benefitIdNumber) {
      case 1:
        tablaAhorro = 'creditos';
        campoUsuario = 'usuariocredi';
        campoSegAhorro = 'seg_credito';
        tablaSegAhorro = 'seg_creditos';
        camposSegAhorro = 'monto, usuario, beneficios, tipo_monto, fecha';
        camposAhorro = 'rotativo, SEC, novedades_varias, compra_cartera, usuariocredi, seg_credito, fecha';
        mensajeErrorAhorro = 'Error al crear crédito asociado';
        break;
      case 2:
        tablaAhorro = 'ahorros_voluntarios';
        campoUsuario = 'usuariovolu';
        campoSegAhorro = 'seg_ahorro_voluntario';
        tablaSegAhorro = 'seg_ahorros_voluntarios';
        camposSegAhorro = 'monto, usuario, beneficios, tipo_monto, fecha';
        camposAhorro = 'vista, programado, vacacional, previo_vivienda, usuariovolu, seg_ahorro_voluntario, fecha';
        mensajeErrorAhorro = 'Error al crear ahorro voluntario asociado';
        break;
      case 3:
        tablaAhorro = 'ahorros_obligatorios';
        campoUsuario = 'usuariobli';
        campoSegAhorro = 'seg_ahorro_obligatorio';
        tablaSegAhorro = 'seg_ahorros_obligatorios';
        camposSegAhorro = 'monto, usuario, beneficios, tipo_monto, fecha';
        camposAhorro = 'ahorro_ordinario, ahorro_permanente, usuariobli, seg_ahorro_obligatorio, fecha';
        mensajeErrorAhorro = 'Error al crear ahorro obligatorio asociado';
        break;
      default:
        return res.status(400).send("ID de beneficio inválido");
    }
  
    try {
      db.query('SELECT id FROM usuarios WHERE Documento = ?', [documentoNumber], (err, userResult) => {
        if (err) {
          console.log("Error al buscar usuario:", err);
          return res.status(500).send("Error al buscar el usuario");
        }
        console.log("Resultado de búsqueda de usuario:", userResult);
  
        if (userResult.length === 0) {
          return res.status(404).send("Usuario no encontrado");
        }
        const userId = userResult[0].id;

        console.log("se encontro el usuario")

        db.query(`SELECT * FROM ${tablaAhorro} WHERE ${campoUsuario} = ?`, [userId], (err, ahorroResult) => {
          if (err) {
            console.log("Error al buscar en tabla de ahorro:", err);
            return res.status(500).send(`Error al buscar en ${tablaAhorro}`);
          }
          console.log("Resultado de búsqueda en tabla de ahorro:", ahorroResult);
  
          if (ahorroResult.length > 0) {
            return res.status(400).send(`El usuario ya tiene un registro en ${tablaAhorro}`);
          }
          db.query('SELECT * FROM aso_bene WHERE usuario = ? AND beneficios = ?', [userId, benefitIdNumber], (err, asoBeneResult) => {
            if (err) {
              console.log("Error al verificar beneficio asociado:", err);
              return res.status(500).send("Error al verificar beneficio asociado");
            }
            console.log("Resultado de verificación de beneficio asociado:", asoBeneResult);
  
            if (asoBeneResult.length > 0) {
              return res.status(400).send("El usuario ya tiene este beneficio asociado");
            }
            db.query('INSERT INTO aso_bene (usuario, beneficios) VALUES (?, ?)', [userId, benefitIdNumber], (err, result) => {
              if (err) {
                console.log("Error al asociar beneficio:", err);
                return res.status(500).send("Error al asociar beneficio al usuario");
              }
              console.log("Resultado de inserción en aso_bene:", result);
  
              db.query(`INSERT INTO ${tablaSegAhorro} (${camposSegAhorro}) VALUES (?, ?, ?, ?, NOW())`, [0, userId, benefitIdNumber, 'Tipo de monto'], (err, segAhorroResult) => {
                if (err) {
                  console.log("Error al crear segmento de ahorro:", err);
                  return res.status(500).send(`Error al crear segmento de ${tablaAhorro}`);
                }
                console.log("Resultado de inserción en segmento de ahorro:", segAhorroResult);
  
                db.query(`INSERT INTO ${tablaAhorro} (${camposAhorro}) VALUES (?, ?, ?, ?, ?, ?, NOW())`, [0, 0, 0, 0, userId, segAhorroResult.insertId], (err, ahorroResult) => {
                  if (err) {
                    console.log("Error al crear registro en tabla de ahorro:", err);
                    return res.status(500).send(mensajeErrorAhorro);
                  }
                  console.log("Resultado de inserción en tabla de ahorro:", ahorroResult);
                  res.send("Beneficio asociado y registro creado correctamente");
                });
              });
            });
          });
        });
      });
    } catch (error) {
      console.log("Error en el servidor:", error);
      res.status(500).send("Error en el servidor");
    }
  });  
  

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001");
});