import { db } from '../utils/database.util';
import { DataTypes } from 'sequelize';
import { User } from './Users';
import { Product } from './Products';

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

   Order.belongsTo(User, {foreignKey: 'userId'});

  //  Order.belongsToMany(Product, { through: 'ProductsInOrder',foreignKey: 'orderId', otherKey: 'productId'});

export {Order}
