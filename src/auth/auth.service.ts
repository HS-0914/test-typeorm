import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: { username: newUser.username }
        });
        if(userFind) {
            throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
        }
        return await this.userService.save(newUser);
    }

    async validateUser(userDTO: UserDTO): Promise<UserDTO | undefined> {
        let userFind: UserDTO = await this.userService.findByFields({
            where: { username: userDTO.username }
        });
        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password); // 값은 true or false;

        if( !userFind || !validatePassword ) {
            throw new UnauthorizedException();
        }
        return userFind;
    }
}
