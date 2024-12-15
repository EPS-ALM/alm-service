require('dotenv').config();

export default class UrlConstants {
    private static isDev = process.env.NODE_ENV === 'development'
    private static ip = process.env.IP as string
    public static readonly URL_BASE_ALM_ASSETS = this.isDev ? `http://${this.ip}:8000` : "https://alm-assets-898cc81ff044.herokuapp.com";
    public static readonly PATH_MARKOVITZ = `${UrlConstants.URL_BASE_ALM_ASSETS}/markowitz`;
}