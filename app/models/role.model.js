module.exports = (sequelize,Sequelize)=>{
    Role = sequelize.define('role',{
        id_role:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            // allowNull: false,
            autoIncrement: true,

        },
        name:{
            type:Sequelize.STRING
        },
    });
    return Role;
}