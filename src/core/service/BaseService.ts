export default interface BaseService {
    execute(params: { [key: string]: any}): Promise<any>;
}