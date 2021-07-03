const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();

const corsOptions= {
    origin:'http://localhost:8081'
}
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}))

// app.get('/',(req,res)=>{
//     console.log(req)
//     res.json({
//         message:'welcome to app service management'
//     })
// })
const db = require('./app/models');
const Role  = db.role;
db.sequelize.sync();
// initial();
// db.sequelize.sync({force:true}).then(()=>{
//     console.log('Drop and Sync Db');
//     initial();
// })
function initial() {
    Role.create({
      id_user: 1,
      name: "user"
    });
   
    Role.create({
      id_user: 2,
      name: "visitor"
    });
   
    Role.create({
      id_user: 3,
      name: "admin"
    });
}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});