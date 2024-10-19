import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { EventsService } from '../events/events.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  // Get the activities registered by the user
  @Get(':id/events')
  @ApiOperation({ summary: 'Get registered events for a user' })
  @ApiParam({ name: 'id', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of events registered by the user.' })
  @ApiResponse({ status: 404, description: 'User not found or no registered events.' })
  async getUserEvents(@Param('id') userId: string) {
    const events = await this.usersService.getUserRegisteredEvents(+userId);
    if (!events || events.length === 0) {
      throw new NotFoundException('該用戶未報名任何活動');
    }
    return { events };
  }

  // Registration event
  @Post(':userId/register/:eventId')
  @ApiOperation({ summary: 'Register a user for an event' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiParam({ name: 'eventId', required: true, description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Registration successful.' })
  @ApiResponse({ status: 404, description: 'Registration failed.' })
  async registerEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    const registration = await this.eventsService.registerEvent(+userId, +eventId);
    if (!registration) {
      throw new NotFoundException('報名失敗');
    }
    return { message: '報名成功' };
  }

  // Cancel registration event
  @Delete(':userId/unregister/:eventId')
  @ApiOperation({ summary: 'Cancel registration for an event' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiParam({ name: 'eventId', required: true, description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Unregistration successful.' })
  @ApiResponse({ status: 404, description: 'Unregistration failed.' })
  async unregisterEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    const unregistration = await this.eventsService.unregisterEvent(+userId, +eventId);
    if (!unregistration) {
      throw new NotFoundException('取消報名失敗');
    }
    return { message: '取消報名成功' };
  }
}
