import { db } from '../utils/database.util';
import { DataTypes } from 'sequelize';

const columns = {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE
    }
};
const config = {}

const ProductImgs = db.define('ProducstImgs', columns, config);

export {ProductImgs};