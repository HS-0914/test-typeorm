import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function ormConfig(): TypeOrmModuleOptions{
    const commonConf = {
        SYNCRONIZE: false, // db를 자동으로 업데이트?
        ENTITIES: [__dirname + '/domain/*.entity.{ts,js}'],
        MIGRATIONS: [__dirname + '/migrations/**/*.{ts,js}'],
        CLI: {
            migrationsDir: 'src/migrations',
        },
        MIGRAIONS_RUN: false,
    };

    const ormconfig: TypeOrmModuleOptions = {
        type: 'mysql',
        host: 'localhost',
        port: 13306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: commonConf.ENTITIES,
        synchronize: commonConf.SYNCRONIZE,
        // entities: [Cat, User, UserAuthority],
        // synchronize: false, // 개발할때만 true, 운영할때는 X
        logging: true, //로그에 쿼리문이 보이게 하는 Option
        migrations: commonConf.MIGRATIONS,
        // cli: commonConf.CLI,
        migrationsRun: commonConf.MIGRAIONS_RUN
    }
    console.log(ormconfig.entities);
    return ormconfig;
}

export { ormConfig }