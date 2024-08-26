import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity() // () 안에 아무것도 없으면 밑에 class 이름으로 생성
export class Cat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    breed: string;
}