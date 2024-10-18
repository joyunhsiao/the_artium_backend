import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Use Prisma to interact with PostgreSQL
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async getAllEvents(search?: string, category?: string) {
    const events = await this.prisma.event.findMany({
      where: {
        title: {
          contains: search || '',
          mode: 'insensitive',  // 忽略大小寫
        },
      },
    });
    return events;
  }

  async getEventById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!event) {
      throw new NotFoundException('活動未找到');
    }
    return event;
  }

  async createEvent(createEventDto: CreateEventDto) {
    const event = await this.prisma.event.create({
      data: createEventDto,
    });
    return event;
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.prisma.event.update({
      where: { id: parseInt(id, 10) },
      data: updateEventDto,
    });
    if (!event) {
      throw new NotFoundException('活動未找到');
    }
    return event;
  }

  async deleteEvent(id: string) {
    await this.prisma.event.delete({
      where: { id: parseInt(id, 10) },
    });
    return { message: '活動刪除成功' };
  }
}
