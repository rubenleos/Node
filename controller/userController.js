const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys')

module.exports = {
    
    login(req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const numero = req.body.numero;

        User.findByEmail(email, async (err, myUser) => {
            
            console.log('Error ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },

    login2(req, res) {

       // const email = req.body.user;
       // const password = req.body.password;
       const numero = req.body.numero;
        User.findByUser(usuario, async (err, myUser) => {
            
            console.log('Error ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la busqueda de el numero',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }
 //se nesecita quitar la contraseña para validar la fecha de vensimiento 
            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                       id:myUser.id,
                         numero:myUser.numero,
                       producto:myUser.producto,
                        cliente:myUser.cliente,
                        horario:myUser.horario,
                fechaExpiracion:myUser.fechaExpiracion,
                telefonoSoporte:myUser.telefonoSoporte,
                       contacto:myUser.contacto,
                           area:myUser.area,
                  fechaRegistro:myUser.fechaRegistro,
              fechaModificacion:myUser.fechaModificacion,
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El password es incorrecto'
                });
            }

        });

    },





    contratos(req, res) {

        const numero = req.body.num;
        //const fechaE = req.body.FechaExpiracion;
        
        
        const fecha1 = new Date;
        const fechas =Date.parse(fecha1);
        const  year= fechas.getFullYear;
        const month= fechas.getDate;
        const day= fechas.getDay;
     const fecha = year +'/'+month+'/'+day

       

        User.findByNumber(numero,async (err, myUser) => {
            
            console.log('Error findNumber', err);
            console.log('USUARIO ', myUser);
            //console.log('USUARIO ', myUser.FechaExpiracion);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error en la busqueda',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El numero no fue encontrado'
                });
            }

            //const isNumeroValid = await bcrypt.compare(numero, myUser.numero);
             const fechaE = Date.parse(myUser.FechaExpiracion);
            if (fechaE > fechas) {
                console.log('fecha de hoy', typeof fechas)
                console.log('fecha de la bdd', typeof fechaE)
                console.log('fecha de hoy', fechas)
                console.log('fecha de la bdd', fechaE)
                const token = jwt.sign({id: myUser.id, numero: myUser.numero}, keys.secretOrKey, {});

                const data = {
                    
                             id:myUser.id,
                         numero:myUser.numero,
                       producto:myUser.producto,
                        cliente:myUser.cliente,
                        horario:myUser.horario,
                fechaExpiracion:myUser.fechaExpiracion,
                telefonoSoporte:myUser.telefonoSoporte,
                       contacto:myUser.contacto,
                           area:myUser.area,
                  fechaRegistro:myUser.fechaRegistro,
              fechaModificacion:myUser.fechaModificacion,

                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'Numero autentificado',
                    data: data 
                    // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });
               

            }
            else {
                console.log('Error ', myUser.FechaExpiracion);
                console.log('Error ', fechas);
                console.log('fecha de hoy', typeof fechas)
                console.log('fecha de la bdd', typeof fechaE)
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'Fecha expirada',
                    message: fecha
                }
                );
                
            }

        });

    },

      

            
            

    register(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
            });

        });

    }

}