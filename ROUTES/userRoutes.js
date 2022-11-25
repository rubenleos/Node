const userController =require('../models/user');

module.exports = (app) =>{

    //Get => Obtener datos
    //Post-> almacenar datos
    //Put -> Actualisar datos
    //Delete -->Eliminar Datos

    app.post('/api/users/create' ,userController.register);

    
}




    