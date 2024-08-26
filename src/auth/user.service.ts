import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    
    // options의 내용을 가지고 검색
    async findByFields(options: FindOneOptions<UserDTO>): Promise<UserDTO | undefined> {
        return await this.userRepository.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
        await this.transformPassword(userDTO);
        console.log(userDTO);
        return await this.userRepository.save(userDTO);
    }

    async transformPassword(userDTO: UserDTO): Promise<void> {
        userDTO.password = await bcrypt.hash(
            userDTO.password, 10,
        );
        return Promise.resolve();
    }
}