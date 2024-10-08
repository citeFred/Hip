import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExhibitionsMemberService } from './exhibitions_member.service';
import { CreateExhibitionsMemberDto } from './dto/create-exhibitions_member.dto';
import { ExhibitionMember } from './entities/exhibition_member.entity';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Controller('exhibition-members')
export class ExhibitionsMemberController {
    constructor(private readonly exhibitionsMemberService: ExhibitionsMemberService) {}

    @Post('register')
    @Roles('admin')
    @UseInterceptors(FileInterceptor('file')) // 'file'은 업로드할 파일의 필드 이름
    async create(
        @Body() createExhibitionsMemberDto: CreateExhibitionsMemberDto,
        @UploadedFile() file: Express.Multer.File // 파일 정보
    ): Promise<{ member: ExhibitionMember; message: string }> {
        const member = await this.exhibitionsMemberService.create(createExhibitionsMemberDto, file);
        return { message:'멤버가 생성되었습니다.', member }; // 생성된 전시 멤버 반환
    }

    @Get()
    async findAll(): Promise<{ member:ExhibitionMember[]; message: string }> {
        const member = await this.exhibitionsMemberService.findAll();
        return { message:'전체 멤버를 조회했습니다', member }; // 모든 전시 멤버 반환
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<{ member: ExhibitionMember; message: string }> {
        const member = await this.exhibitionsMemberService.findOne(id);
        return { message:`Id가 ${id}인 멤버를 조회했습니다.`, member }; // 특정 전시 멤버 반환
    }

    @Put(':id')
    @Roles('admin')
    async update(@Param('id') id: number, @Body() updateData: Partial<CreateExhibitionsMemberDto>): Promise<{ member: ExhibitionMember; message: string }> {
        const member = await this.exhibitionsMemberService.update(id, updateData);
        return { message:`${id}인 멤버를 수정했습니다`, member }; // 업데이트된 전시 멤버 반환
    }

    @Delete(':id')
    @Roles('admin')
    async remove(@Param('id') id: number): Promise<{ message: string }> {
        await this.exhibitionsMemberService.remove(id);
        return { message:'삭제 완료되었습니다.' }; // 삭제 완료 메시지 반환
    }

}
