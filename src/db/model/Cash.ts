import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from '../index';

export class Cash extends Model<InferAttributes<Cash>, InferCreationAttributes<Cash>> {
    declare id?: number;
    declare invested: number;
    declare inCash: number;
}

Cash.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    invested: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    inCash: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: db
});