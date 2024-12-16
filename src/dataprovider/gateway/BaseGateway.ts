/* istanbul ignore next */
export default abstract class BaseGateway {
    buildUrl(url: string, params: any = {}){
        return `${url}?${params}`
    }

    buildRiskUrl(url: string, params: string){
        return `${url}/${params}`
    }
}