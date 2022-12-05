import { db } from "../utils/database.util";
import { DataTypes } from "sequelize";
import { Product } from "./Products";

const config = {
  tableName: "Size",
  timestamps: true,
  paranoid: true
};

const Size = db.define("Size", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  sizeLetter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "unisex"
  },
  sizeNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deletedAt: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "null"
  }
}, config);

export { Size  };
