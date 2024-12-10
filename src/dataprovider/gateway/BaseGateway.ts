/* istanbul ignore next */
export default abstract class BaseGateway {
    buildUrl(url: string, params: any = {}){
        return `${url}?api_key=${process.env.API_KEY}&${params}`
    }
}