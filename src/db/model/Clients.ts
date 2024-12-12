import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from '../index';

export class Clients extends Model<InferAttributes<Clients>, InferCreationAttributes<Clients>> {
    declare id?: number;
    declare number: number;
}

Clients.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    timestamps: true,
    sequelize: db
});