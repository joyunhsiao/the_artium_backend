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
          mode: 'insensitive',  // case insensitive
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

  // Registration event
  async registerEvent(userId: number, eventId: number) {
    try {
      const registration = await this.prisma.userEvent.create({
        data: {
          userId: userId,
          eventId: eventId,
        },
      });
      return registration;
    } catch (error) {
      return null;
    }
  }

  // Cancel registration event
  async unregisterEvent(userId: number, eventId: number) {
    try {
      const unregistration = await this.prisma.userEvent.deleteMany({
        where: {
          userId: userId,
          eventId: eventId,
        },
      });
      return unregistration;
    } catch (error) {
      return null;
    }
  }
}
