import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { verify } from 'argon2';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUserService } from './user.interface';
import { PrismaService } from '@app/modules/database/services';

@Injectable()
export class UserService extends IUserService {
	notFoundMessage = 'Không tìm thấy User';

	constructor(private readonly dbContext: PrismaService) {
		super();
	}

	async validateUserByUsernamePassword(username: string, password: string): Promise<UserEntity> {
		const user = await this.getOne({ where: { username } });
		if (!user) {
			throw new UnauthorizedException('Không tìm thấy user');
		}
		const comparePassword = await verify(user.password, password);
		if (!comparePassword) {
			throw new UnauthorizedException('Sai mật khẩu');
		}
		return user;
	}

	async validateUserById(id: string): Promise<UserEntity> {
		return this.getOneByIdOrFail(id);
	}
}
