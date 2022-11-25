const {db} = require('../utils/database.util');
import { DataTypes } from 'sequelize';
import { User } from './Users';
import { Product } from './Products';
import { ProductsInOrder } from './ProductsInOrder';

const columns = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        orderDate: {
            type: DataTypes.DATE
        }
    };

const config = {
    tableName: "Orders",
    timestamps: true,
    paranaoid: true
}

const Order = db.define('Order', columns, config);

Order.associate = (models: any) => {
    Order.belongsTo(models.User, {foreignKey: 'userId'});

    Order.belongsToMany(models.Product, { through: 'ProductsInOrder',foreignKey: 'orderId', otherKey: 'productId'})
}



export {Order}
