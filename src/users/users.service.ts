import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Get the activities registered by the user
  async getUserRegisteredEvents(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        registrations: {
          include: {
            event: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException('用戶未找到');
    }
    return user.registrations.map((registration) => ({
      id: registration.event.id,
      title: registration.event.title,
      date: registration.event.date,
      time: registration.event.time,
      location: registration.event.location,
    }));
  }
}
