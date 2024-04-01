import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IsNumber } from '../decorators/validation.decorator';

export class PaginationDto<T> {
	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Số item mỗi trang', example: '10', type: 'string' })
	limit?: number;

	@IsOptional()
	@IsNumber()
	@Transform(({ value }) => +(value || 10))
	@ApiProperty({ description: 'Số trang hiện tại', example: '1', type: 'string' })
	page?: number;

	@IsOptional()
	@Transform(({ value }) => JSON.parse(value || '{}'))
	@ApiProperty({
		description: 'Sort theo field',
		example: '{ "createdAt": "ASC" }',
		type: 'string'
	})
	order?: string;

	@IsOptional()
	@ApiProperty({ description: 'Tìm kiếm', example: '' })
	search?: string;
}
