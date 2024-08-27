// class-validator의 데코레이터 자세히 - https://github.com/typestack/class-validator#manual-validation
import { IsNotEmpty } from "class-validator";

export class UserDTO {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}