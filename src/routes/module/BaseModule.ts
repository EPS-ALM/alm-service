import { Request, Response } from 'express';

export default abstract class BaseModule {
  public abstract execute(
    status: number
  ): (req: Request, res: Response) => Promise<void>;

  protected abstract executeImpl(
    req: Request,
    res: Response,
    status: number
  ): Promise<void>;

  protected abstract handleError(error: any, res: Response): void;
}
