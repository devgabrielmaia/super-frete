import { Test, TestingModule } from '@nestjs/testing';
import { CatalogController } from '@src/catalog/http/catalog.controller';
import { CatalogService } from '@src/catalog/services/catalog.service';
import { InMemoryCatalogRepository } from '@src/catalog/repositories/in-memory-catalog.repository';

describe('Catalog feature test', () => {
  let catalogController: CatalogController;

  it('should throw 404 catalog not fount', async () => {
    await expect(async () => {
      await catalogController.search({ name: 'item name' });
    }).rejects.toThrow();
  });

  it('should create new item on catalog', async () => {
    const payload = {
      name: 'item name',
    };
    const result = await catalogController.create(payload);
    expect(result).toEqual({
      message: 'Catalog created successfully',
    });
  });

  it('should search items', async () => {
    const result = await catalogController.search({ name: 'item name' });
    expect(result).toMatchObject({
      data: [{ id: 1, name: 'item name' }],
    });
  });

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatalogController],
      providers: [
        {
          provide: 'CatalogRepositoryInterface',
          useClass: InMemoryCatalogRepository,
        },
        CatalogService,
      ],
      exports: [],
    }).compile();
    catalogController = app.get<CatalogController>(CatalogController);
  });
});
