import { Module } from '@nestjs/common';
import { LibModule } from '@src/libs/lib.module';
import { ConfigModule } from '@nestjs/config';
import { CatalogModule } from '@src/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LibModule,
    CatalogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
