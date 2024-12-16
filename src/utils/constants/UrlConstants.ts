require("dotenv").config();

export default class UrlConstants {
  private static isDev = process.env.NODE_ENV === "development";
  private static ip = process.env.IP as string;
  public static readonly URL_BASE_ALM_ASSETS = this.isDev ? `http://${this.ip}` : "https://alm-assets-898cc81ff044.herokuapp.com";
  public static readonly URL_BASE_ALM_RISK = this.isDev ? `http://${this.ip}` : "https://almriskmanager-16e9ecd81666.herokuapp.com";

  public static readonly PATH_MARKOVITZ = `${UrlConstants.URL_BASE_ALM_ASSETS}/markowitz`;
  public static readonly PATH_FORECASTVAR = `${UrlConstants.URL_BASE_ALM_ASSETS}/forecast_var`;

  public static readonly PATH_RISK_NOTEBOOK = `${UrlConstants.URL_BASE_ALM_RISK}/notebook`;

  public static readonly URL_LIABILITIES = `http://187.84.176.16:10100/grafico`;
}
