const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};
User.findById = (id, result) => {

    const sql = `
    SELECT
        id,
        email,
        name,
        lastname,
        image,
        password
    FROM
        users
    WHERE
        id = ?
    `;
    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}



//////////

User.findByNumber = (num, result) => {

    const sql = `
    SELECT
    Id,
    Numero,
    Producto,
    Cliente,
    Horario,
    FechaExpiracion,
    TelefonoSoporte,
    Contacto,
    Area,
    FechaRegistro,
    FechaModificacion,
    Url
    FROM
        Contratos
    WHERE
        Numero = ?
    `;

    db.query(
        sql,
        [num],
         (err, user) => {
            if (err) {
                console.log('Error 1:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}
/////////

User.create = (user, result) => {

    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                update_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            user.password,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

module.exports = User;





