import { CatalogSchema } from '@src/catalog/entities/catalog.entity';
import {
  CatalogRepositoryInterface,
  Filter,
} from '@src/catalog/contracts/catalog-repository.interface';

export class InMemoryCatalogRepository implements CatalogRepositoryInterface {
  private products: CatalogSchema[];

  constructor() {
    this.products = [];
  }
  create(payload: CatalogSchema): Promise<boolean> {
    this.products.push({ id: 1, ...payload });
    return Promise.resolve(true);
  }
  search(filter: Filter): Promise<CatalogSchema[]> {
    return Promise.resolve(this.products);
  }
}
