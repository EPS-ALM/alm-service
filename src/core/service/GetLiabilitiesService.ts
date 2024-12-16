import LiabilitiesGateway from "../../dataprovider/gateway/LiabilitiesGateway";
import BaseService from "./BaseService";

export default class GetLiabilitiesService implements BaseService {
  constructor(private readonly gateway: LiabilitiesGateway) {}

  public async execute(): Promise<string> {
    const response = await this.gateway.execute();

    return response;
  }
}
