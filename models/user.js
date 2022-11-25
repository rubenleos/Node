const db = require('../config/config');

//se crea el objeto

const User = {}

User.create = (user,result) => {
const sql = 

`INSERT INTO
email,
users(
    name,
    lastname,
    image,
    password
    created_at
    update_at
)
VALUES( ?, ?, ?, ?, ?, ? ,?, ?)
`;
db.query(
    sql,
    [
    user.name,
    user.lastname,
    user.image,
    user.password,
    user.created_at,
    user.update_at,
    new Date(),
    new Date()
    ],
    (err,res)=>{
        if(err){
            console.log('Error',err);
        result(err,null);
        }
       else{

      console.log('id del nuevo usuario',res.insertId);

       }

    }
    
    )

}

module.exports= User;





