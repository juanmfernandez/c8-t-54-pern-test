const { db } = require('../utils/database.util');
import { DataTypes } from 'sequelize' 

const columns = {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
};
const config = {
    tableName: "ProductsInCarts",
    timestamps: true,
    paranaoid: true
}

const ProductsInCart = db.define('ProductsInCart', columns, config);


export {ProductsInCart}