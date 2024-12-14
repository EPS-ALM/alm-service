import ForecastVarService from "../core/service/ForecastVarService";
import ForecastVarGateway from "../dataprovider/gateway/ForecastVarGateway";

export const forecastVar = async () => {
    const gateway = new ForecastVarGateway();
    await new ForecastVarService(gateway).execute();
}