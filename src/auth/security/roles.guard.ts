import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../entity/user.entity";

//CanActivate -> 사용가능하는 여부를 묻는것
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector){} //Reflector -> runtime 시에 메타데이터를 가져올수있게 해주는것

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
        const roles = this.reflector.get<string[]> ('roles', context.getHandler()); // context.getHandler를 읽어올수있음

        if(!roles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user as User; //passport.jwt.strategy에 validate()에서 넘어온 user

        return user && user.authorities && user.authorities.some(role => roles.includes(role))
    }

}