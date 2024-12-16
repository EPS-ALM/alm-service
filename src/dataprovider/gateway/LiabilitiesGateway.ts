import axios from "axios";
import UrlConstants from "../../utils/constants/UrlConstants";
import { logger } from "../../config/AppLogger";

export default class LiabilitiesGateway {
  public async execute(): Promise<string> {
    const url = UrlConstants.URL_LIABILITIES;

    const response = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        logger.error(error, "Erro ao chamar api de passivo");
        return null;
      });
    return response;
  }
}
