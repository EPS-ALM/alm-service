import MarkowitzService from "../core/service/MarkowitzService";
import MarkowitzGateway from "../dataprovider/gateway/MarkowitzGateway";

export const markowitz = async () => {
    const gateway = new MarkowitzGateway();
    await new MarkowitzService(gateway).execute();
}