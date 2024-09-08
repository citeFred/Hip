// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// import { User } from './users/user.entity';
// import { MaterialModule } from './material/material.module';

// @Module({
//     imports: [
//         TypeOrmModule.forRoot({
//         
//         }),
//         UsersModule,
//         MaterialModule,
//     ],
// })
// export class AppModule {}

//>>>>>>>> .env 파일을 만들어 Db정보 저장후 은닉

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ExhibitionModule } from './exhibitions/exhibitions.module';
import { Exhibition } from './exhibitions/exhibition.entity';
import { Course } from './courses/entities/course.entity'
import { CoursesModule } from './courses/courses.module';
import { UCat } from './ucat/entities/ucat.entity';
import { UcatModule } from './ucat/ucat.module';
import { DocNameModule } from './doc_name/doc_name.module';
import { DocName } from './doc_name/entities/doc_name.entity';
import { CourseDoc } from './course_doc/entities/course_doc.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { CourseDocModule } from './course_doc/course_doc.module';
import { VideoTopicModule } from './video_topic/video_topic.module';
import { VideoModule } from './video/video.module';

@Module({
    imports: [
        ConfigModule.forRoot(), // ConfigModule 추가
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: process.env.DB_TYPE as 'mysql',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [User,Exhibition, Course, UCat, DocName, CourseDoc],
                synchronize: true,
            }),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MulterModule.register({
            dest: './uploads',
        }),
        UsersModule,       
        ExhibitionModule,
        CoursesModule,
        UcatModule,
        DocNameModule,
        CourseDocModule,
        VideoTopicModule,
        VideoModule,
    ],
})
export class AppModule {}
