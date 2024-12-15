import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import db from '../index';

export class Assets extends Model<InferAttributes<Assets>, InferCreationAttributes<Assets>> {
    declare ticker: string;
    declare markowitzAllocation?: number;
    declare isActive?: boolean; 
    declare historicalAnnualReturn?: number;
    declare historicalAnnualVolatility?: number;
    declare forecastAnnualReturn?: number;
    declare forecastAnnualVolatility?: number;
    declare forecastVarAllocation?: number;
}

Assets.init({
    ticker: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    markowitzAllocation: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    historicalAnnualReturn: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    historicalAnnualVolatility: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    forecastAnnualReturn: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    forecastAnnualVolatility: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    forecastVarAllocation: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
}, {
    timestamps: true,
    sequelize: db
});