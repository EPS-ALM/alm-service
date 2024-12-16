import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from '../index';

export class EfficientFrontier extends Model<InferAttributes<EfficientFrontier>, InferCreationAttributes<EfficientFrontier>> {
    declare id?: number;
    declare base64: string | null;
}

EfficientFrontier.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    base64: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    timestamps: true,
    sequelize: db
});