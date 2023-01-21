export class BaseAPI {
  public create?(data: unknown): Promise<unknown>;

  public read?(identifier?: string): Promise<unknown>;

  public update?(identifier: string, data: unknown): Promise<unknown>;

  public delete?(data: unknown): Promise<unknown>;
}
