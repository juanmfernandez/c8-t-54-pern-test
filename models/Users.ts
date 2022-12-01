import { db } from '../utils/database.util';
import { DataTypes } from 'sequelize';
import { Cart } from './Carts';

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
    },
};

const config = {
    tableName: "Users",
    timestamps: true,
    paranoid: true
};

const User = db.define('User', columns, config);

User.belongsTo(Cart, { foreignKey: "cartId" });

export {User}