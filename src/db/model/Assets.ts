import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from '../index';

export class Assets extends Model<InferAttributes<Assets>, InferCreationAttributes<Assets>> {
    declare ticker: string;
    declare allocation: number;
    declare isActive: boolean; 
}

Assets.init({
    ticker: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    allocation: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: db
});