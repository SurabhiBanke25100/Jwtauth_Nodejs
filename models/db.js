const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../connect');


const User = sequelize.define('entries', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING

    },

    confirm_password: {
        type: DataTypes.STRING
    }

});


// Create the table in the database
User.sync()
    .then(() => {
        console.log('signup table created successfully');
    })
    .catch((err) => {
        console.error('Error creating signup table:', err);
    });


module.exports = {
    User,
    sequelize
};