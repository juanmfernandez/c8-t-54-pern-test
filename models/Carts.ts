import { db } from '../utils/database.util';
import { DataTypes } from "sequelize";

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

export {Cart}
