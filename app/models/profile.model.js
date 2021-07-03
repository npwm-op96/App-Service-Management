
module.exports =(sequelize,Sequelize)=>{
    const Profile =  sequelize.define('profile',
    {
        id_profile:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,

        },
        fname:{
            type:Sequelize.STRING
        },
        lname:{
            type:Sequelize.STRING
        },
        img_profile:{
            type:Sequelize.STRING
        },
        position:{
            type:Sequelize.STRING
        },
        department:{
            type:Sequelize.STRING
        },
        tel:{
            type:Sequelize.STRING
        },
  
    });
    return Profile
}
