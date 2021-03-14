import { IsNotEmpty } from 'class-validator';

export class ContentRequest {
  @IsNotEmpty({ message: 'entity name is required.' })
  entity: string;

  @IsNotEmpty({ message: 'folder name is required.' })
  folder: string;

  fileName?: string;

  bucketName?: string;
}
