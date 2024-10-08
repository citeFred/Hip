import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UCat } from '../../ucat/entities/ucat.entity';
import { DocName } from '../../doc_name/entities/doc_name.entity';
import { VideoTopic } from 'src/course/video_topic/entities/video_topic.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    course_id: number;

    @Column()
    course_title: string;

    @Column()
    description: string;
    
    @Column()
    instructor_name: string;

    @Column({nullable:true})
    course_notice: string;

    @OneToMany(() => UCat, (ucat) => ucat.course, { cascade: true })
    uCats: UCat[];

    @OneToMany(() => DocName, (docname) => docname.course, { cascade: true })
    docName: DocName[];

    @OneToMany(() => VideoTopic, (videoTopic) => videoTopic.course, { cascade: true })
    videoTopic: VideoTopic[];

}