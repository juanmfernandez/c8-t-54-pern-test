const { db } = require("../utils/database.util");
import { DataTypes } from "sequelize";
import { Product } from "./Products";
import { User } from "./Users";

const columns = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
  },
};
const config = {};

const Cart = db.define("Cart", columns, config);

Cart.belongsTo(User, { foreignKey: "userId" });
User.belongsTo(Cart, { foreignKey: "cartId" });

Cart.belongsToMany(Product, {
  through: "ProductsInCart",
  foreignKey: "cartId",
  otherKey: "productId",
});

export { Cart };
