import { CatalogSchema } from '@src/catalog/entities/catalog.entity';

export type Filter = {
  id?: number;
  name?: string;
};

export type CatalogData = { name: string; increment_id: number };

export interface CatalogRepositoryInterface {
  create(payload: CatalogSchema): Promise<boolean>;
  search(filter: Filter): Promise<CatalogSchema[]>;
}
