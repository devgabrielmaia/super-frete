import { Inject, Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { CatalogSchema } from '@src/catalog/entities/catalog.entity';
import {
  CatalogData,
  CatalogRepositoryInterface,
  Filter,
} from '@src/catalog/contracts/catalog-repository.interface';
import Firestore = firestore.Firestore;

@Injectable()
export class CatalogRepository implements CatalogRepositoryInterface {
  constructor(@Inject('FIRESTORE') private readonly db: Firestore) {}

  async create(catalogData: CatalogSchema): Promise<boolean> {
    const resultRef = await this.db.collection('catalog').add(catalogData);
    const response = await resultRef.get();
    return response.exists;
  }

  async search(filter: Filter): Promise<CatalogSchema[]> {
    const catalogRef = await this.db.collection('catalog');
    let query;
    console.log(filter);
    if (filter.id) {
      query = catalogRef.where('increment_id', '==', Number(filter.id));
    }
    if (filter.name) {
      query = catalogRef.where('name', '==', filter.name);
    }
    const resultRef = await (query || catalogRef).get();
    const catalogList: CatalogSchema[] = [];
    resultRef.forEach((doc) => {
      const data = doc.data() as CatalogData;
      catalogList.push({
        id: data.increment_id,
        name: data.name,
      });
    });
    return catalogList;
  }
}
