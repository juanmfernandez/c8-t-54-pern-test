import { db } from '../utils/database.util';
import { DataTypes } from 'sequelize';
import { Product } from './Products';

const columns = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    colorValue: {
        type: DataTypes.STRING,
        allowNull: false,
    }
};

const config = { tableName: "Colour",
timestamps: true,
paranaoid: true};

const Colour = db.define("Colour", columns, config);

export { Colour }