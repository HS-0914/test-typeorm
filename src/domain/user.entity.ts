import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    //사용자 1명이 여러개의 권한을 가질 수 있으므로 OneToMany 사용
    @OneToMany(type=> UserAuthority, userAuthority=> userAuthority.user, {eager: true}) // eager -> entity를 조회할 때 join된 데이터까지 같이 가져오는 Option
    authorities?: any[];
}