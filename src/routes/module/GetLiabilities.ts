import GetLiabilitiesService from "../../core/service/GetLiabilitiesService";
import LiabilitiesGateway from "../../dataprovider/gateway/LiabilitiesGateway";
import Controller from "../../entrypoint/controller/Controller";

export const getLiabilities = (): Controller<GetLiabilitiesService> => {
  const gateway = new LiabilitiesGateway();
  const service = new GetLiabilitiesService(gateway);
  return new Controller<GetLiabilitiesService>(service);
};
