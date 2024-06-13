import { Global, Module } from '@nestjs/common';
import { CatalogRepository } from '@src/catalog/repositories/catalog.repository';
import { CatalogService } from '@src/catalog/services/catalog.service';
import { CatalogController } from '@src/catalog/http/catalog.controller';

@Global()
@Module({
  controllers: [CatalogController],
  providers: [
    {
      provide: 'CatalogRepositoryInterface',
      useClass: CatalogRepository,
    },
    CatalogService,
  ],
  exports: [],
})
export class CatalogModule {}
