import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './entity/cats.entity';

@Controller('cats')
export class CatsController {
    constructor (private catsService: CatsService){}; //service 사용하기 위해 constructor에 선언

    @Get()
    findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id')id: number): Promise<Cat> {
        return this.catsService.findOne(id);
    }

    @Post()
    create(@Body()cat: Cat){
        this.catsService.create(cat);
    }

    @Delete(':id')
    remote(@Param('id')id: number) {
        return this.catsService.remove(id);
    }

    @Put(':id')
    update(@Param('id')id: number, @Body() cat: Cat){
        this.catsService.update(id, cat);
        return `This action updates a #${id} cat`;
    }
}
