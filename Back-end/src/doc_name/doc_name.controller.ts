import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DocNameService } from './doc_name.service';
import { CreateDocNameDto } from './dto/create-doc_name.dto'; // CreateDocNameDto 임포트
import { UpdateDocNameDto } from './dto/update-doc_name.dto'; // UpdateDocNameDto 임포트
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('courses/:courseTitle/docNames')
export class DocNameController {
    constructor(private readonly docNameService: DocNameService) {}

    @Post('register')
    async create(
        @Param('courseTitle') courseTitle: string,
        @Param('topicTitle') topicTitle: string,
        @Body() createDocNameDto: CreateDocNameDto
    ) {
        const data = await this.docNameService.create(courseTitle, topicTitle, createDocNameDto);
        return {
            message: "doc_name 생성에 성공하셨습니다",
            data: data
        };
    }

    @Get()
    @Roles('admin')
    async findAll(
      @Param('topicTitle') topicTitle: string
    ) {
        const data = await this.docNameService.findAll(topicTitle);
        return {
            message: "전체 강의의 doc_name 조회에 성공하셨습니다",
            data: data
        };
    }

    @Get(':topicTitle')
    async findOne(
      @Param('topicTitle') topicTitle: string
    ) {
        const data = await this.docNameService.findOne(topicTitle);
        return {
            message: "특정 강의의 doc_name 조회에 성공하셨습니다",
            data: data
        };
    }

    @Patch(':topicTitle')
    async update(
      @Param('topicTitle') topicTitle: string,
      @Body() updateDocNameDto: UpdateDocNameDto
    ) {
        const data = await this.docNameService.update(topicTitle, updateDocNameDto);
        return {
          message: "doc_name 수정에 성공하셨습니다",
          data: data
        };
    }
  

    @Delete(':topicTitle')
    async remove(
      @Param('topicTitle') topicTitle: string
    ) {
        const data = await this.docNameService.remove(topicTitle);
        return {
            message: "doc_name 삭제에 성공하셨습니다",
            data: data
        };
    }
}