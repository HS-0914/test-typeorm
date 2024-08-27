import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from '../domain/cats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(Cat)
        private catRepository: Repository<Cat>, // repository 패턴
    ){}

    findAll(): Promise<Cat[]> {
        return this.catRepository.find();
    }

    findOne(id: number): Promise<Cat> {
        return this.catRepository.findOne({where: {id}}); // {where: {id}} typeorm 형식 변경
    }

    async create(cat: Cat): Promise<void> {
        await this.catRepository.save(cat);
    }

    async remove(id: number): Promise<void> {
        await this.catRepository.delete(id);
    }

    async update(id: number, cat: Cat): Promise<void> {
        const existedCat = await this.findOne(id);
        if(existedCat) {
            await this.catRepository.update(
                { id: id },
                cat,
            ); // getconnection은 사용불가
        }
    }
}
