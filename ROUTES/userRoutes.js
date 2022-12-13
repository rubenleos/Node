const userController = require('../controller/userController');

module.exports = (app) =>{

    //Get => Obtener datos
    //Post-> almacenar datos
    //Put -> Actualisar datos
    //Delete -->Eliminar Datos

    app.post('/api/users/create',userController.register);
    app.post('/api/users/login', userController.login);
    app.get('/api/users/contratos', userController.contratos)

    
}




    