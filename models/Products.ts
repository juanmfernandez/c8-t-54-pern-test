import { db } from "../utils/database.util";
import { DataTypes } from "sequelize";
import { Categories } from "./Categories";
import { ProductImgs } from "./ProductImgs";
import { Order } from "./Orders";
import { User } from "./Users";
import { Colour } from "./Colours";

const config = {};

const Product = db.define("Product", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantityInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    get() {
      const rawValue = this.getDataValue('price');
      return rawValue ? parseFloat(rawValue) : null;
    },
    allowNull: false,
  }
}, config);

Product.belongsToMany(Categories, { through: "ProductCategories", foreignKey: "productId", otherKey: "categoryId" });

//Product.hasMany(ProductImgs, {  foreignKey: "ProductId" });
const ProductImgsAssoc = Product.hasMany(ProductImgs, {as:"ProductImgs", foreignKey: "ProductId" });

Product.belongsToMany(Colour, {
  through: "ProductColours",
  foreignKey: "productId",
  otherKey: "colourId",
});

Product.belongsToMany(User, {
  through: "Favorites",
  foreignKey: "productId",
  otherKey: "userId",
});

Product.belongsToMany(Order, {
  through: "ProductsInOrder",
  foreignKey: "productId",
  otherKey: "orderId",
});


export { Product, ProductImgs, ProductImgsAssoc };
