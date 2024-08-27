import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RoleType } from './role-type';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    @UsePipes(ValidationPipe)
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.registerUser(userDTO);
    }
    // async registerAccount(@@Body() userDTO: UserDTO): Promise<any> {
    //     return await this.authService.registerUser(userDTO);
    // }

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
        //res.cookie(key, value, options);
        res.cookie('jwt', jwt.accessToken, {
            httpOnly: true, // 쿠키를 브라우저에서 사용할 수 없음
            maxAge: 24 * 60 * 60 * 1000, // 24시간 * 60분 * 60초 * 1000(1000ms)
        })
        return res.send({ message: 'success' });
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }

    @Get('/admin-role')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RoleType.ADMIN)
    adminRoleCheck(@Req() req: Request): any {
        const user: any = req.user;
        return user;
    }

    @Get('/cookies')
    getCookies(@Req() req: Request, @Res() res: Response): any {
        const jwt = req.cookies['jwt'];
        return res.send(jwt);
    }

    @Post('/logout')
    logout(@Res() res: Response): any {
        res.cookie('jwt', '', {
            maxAge: 0
        });
        return res.send({
            message: 'success'
        });
    }
}
