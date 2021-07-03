
module.exports = (sequelize,Sequelize)=>{
    const Profile = require('../models/profile.model.js')(sequelize,Sequelize);
    const Role = require('./role.model.js')(sequelize,Sequelize);
    const User = sequelize.define('users',{
        id_user:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,

        },
        username:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        id_profile:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        id_role:{
            type:Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });
    Profile.hasOne(User, { foreignKey: 'id_profile' })
    Role.hasOne(User, { foreignKey: 'id_role' })

    return User
}