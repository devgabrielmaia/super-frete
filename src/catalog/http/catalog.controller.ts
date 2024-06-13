import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CatalogCreationResponse,
  CatalogPayload,
  CatalogResource,
  CatalogResponse,
  CatalogSearch,
} from '@src/catalog/http/catalog-presenter.dto';
import { CatalogService } from '@src/catalog/services/catalog.service';
import { CatalogSchema } from '@src/catalog/entities/catalog.entity';

@ApiTags('Catalog')
@Controller('api/v1/catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Post()
  @ApiResponse({
    type: CatalogCreationResponse,
    status: 201,
    description: 'Create Catalog',
  })
  async create(
    @Body() payload: CatalogPayload,
  ): Promise<CatalogCreationResponse> {
    const result: boolean = await this.catalog.create(payload);
    if (!result) {
      throw new UnprocessableEntityException('Catalog not created');
    }
    return new CatalogCreationResponse('Catalog created successfully');
  }

  @Get('/search')
  @ApiResponse({
    type: CatalogResponse,
    status: 200,
    description: 'Search Producers',
  })
  async search(@Query() searchParams: CatalogSearch): Promise<CatalogResponse> {
    const response: CatalogSchema[] = await this.catalog.search(searchParams);
    if (!response.length) {
      throw new NotFoundException('Catalog not found');
    }
    return new CatalogResponse(
      response.map(
        (catalog) => new CatalogResource(catalog.id as number, catalog.name),
      ),
    );
  }
}
