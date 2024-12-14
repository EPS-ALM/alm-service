import { Model, DataTypes } from 'sequelize';
import db from '../config/database';

class Forecast extends Model {
    public id!: number;
    public ticker!: string;
    public allocation!: number;
    public isActive!: boolean;
    public historicalAnnualReturn!: number;
    public historicalAnnualVolatility!: number;
    public forecastAnnualReturn!: number;
    public forecastAnnualVolatility!: number;
}

Forecast.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ticker: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    allocation: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    historicalAnnualReturn: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    historicalAnnualVolatility: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    forecastAnnualReturn: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    forecastAnnualVolatility: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    timestamps: true,
    sequelize: db,
    modelName: 'Forecast'
});

export default Forecast;