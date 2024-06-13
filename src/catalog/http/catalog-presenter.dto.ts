import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CatalogCreationResponse {
  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class CatalogResource {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class CatalogSearch {
  @ApiPropertyOptional()
  id?: number;

  @ApiPropertyOptional()
  name?: string;

  constructor(id?: number, name?: string) {
    this.id = id;
    this.name = name;
  }
}

export class CatalogResponse {
  @ApiProperty({ type: [CatalogResource] })
  data: CatalogResource[];

  constructor(data: CatalogResource[]) {
    this.data = data;
  }
}

export class CatalogPayload {
  @ApiProperty()
  @IsString()
  @Length(1, 255)
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
