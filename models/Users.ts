const { db } = require('../utils/database.util');
import { DataTypes } from 'sequelize';

const columns = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,

    },
    lastName: {
        type: DataTypes.STRING,

    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,

    },
    phoneNumber: {
        type: DataTypes.INTEGER,
    },
    profilePic: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userRole: {
        type: DataTypes.STRING,
    }
};

const config = {
    tableName: "Users",
    timestamps: true,
    paranoid: true
};

const User = db.define('User', columns, config);

// creamos la ralación con la tabla 
User.associate = (models: any) => {
    User.hasOne(models.Cart, { foreignKey: 'userId' });
    
    User.hasMany(models.Order, { foreignKey: "userId" });
    
    User.hasMany(models.Product, { through: 'Favorites', foreignKey: 'userId', otherKey: 'productId' });

}


export { User };
