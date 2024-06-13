import { Inject, Injectable } from '@nestjs/common';
import {
  CatalogRepositoryInterface,
  Filter,
} from '@src/catalog/contracts/catalog-repository.interface';
import { CatalogSchema } from '@src/catalog/entities/catalog.entity';

@Injectable()
export class CatalogService {
  constructor(
    @Inject('CatalogRepositoryInterface')
    private readonly repository: CatalogRepositoryInterface,
  ) {}

  async create(payload: CatalogSchema): Promise<boolean> {
    return this.repository.create(payload);
  }

  async search(filter: Filter): Promise<CatalogSchema[]> {
    return this.repository.search(filter);
  }
}
