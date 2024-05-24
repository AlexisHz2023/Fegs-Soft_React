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
    const Usuario = req.body.Usuario;
    const Clave = req.body.Clave;
    const rol = req.body.rol;

    db.query(
        'INSERT INTO usuarios(Nombre, Correo, Usuario, Clave, rol) VALUES (?, ?, ?, ?, ?)',
        [Nombre, Correo, Usuario, Clave, rol],
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
                    const { id, Nombre, Correo, Usuario, rol } = result[0];
                    res.status(200).json({
                        id,
                        Nombre,
                        Correo,
                        Usuario,
                        rol 
                    });
                } else {
                    res.status(401).send("Credenciales inválidas");
                }
            }
        }
    );
});

app.get("/usuarios", (req, res) => {
    db.query('SELECT u.id, u.Nombre, u.Correo, u.Usuario, r.rol FROM usuarios u INNER JOIN rol r ON u.rol = r.idrol',
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error al obtener usuarios');
            } else {
                res.send(result);
            }
        });
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const Nombre = req.body.Nombre;
    const Correo = req.body.Correo;
    const Usuario = req.body.Usuario;
    const rol = req.body.rol;

    db.query(
        'UPDATE usuarios SET Nombre=?, Correo=?, Usuario=?, rol=? WHERE id=?',
        [Nombre, Correo, Usuario, rol, id],
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


app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
});