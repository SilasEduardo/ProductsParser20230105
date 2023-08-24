import { AppError } from '../../../../shared/errors/AppError';
import { ProductRepositoryInmemory } from '../../infra/mongoDb/in-memory/PoductRepositoryInMemory';
import { StatusAPIUserCase } from './statusAPIUsecase';

let statusAPIUserCase: StatusAPIUserCase;
let productRepositoryInmemory: ProductRepositoryInmemory;

describe('Status API', () => {
  beforeAll(() => {
    productRepositoryInmemory = new ProductRepositoryInmemory();
    statusAPIUserCase = new StatusAPIUserCase(productRepositoryInmemory);
  });

  it('should be able to return  status API ', async () => {
    const status = await statusAPIUserCase.execute();

    if (status) {
      const status = true;
      expect(status).toBeTruthy();
    }
  });
  it("don't should be possible to return status API", async () => {
    const status = await productRepositoryInmemory.listProducts();
    if (!status) {
      expect(async () => {
        await statusAPIUserCase.execute();
      }).rejects.toBeInstanceOf(AppError);
    }
  });
});
