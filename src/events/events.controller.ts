import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: '獲取所有活動' })
  @ApiResponse({ status: 200, description: '獲取成功' })
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: '獲取單個活動詳細資訊' })
  @ApiResponse({ status: 200, description: '活動獲取成功' })
  @ApiResponse({ status: 404, description: '活動未找到' })
  getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

  @Post()
@ApiOperation({ summary: '創建新活動' })
@ApiResponse({ status: 201, description: '活動創建成功', type: CreateEventDto }) // specify response type
createEvent(@Body() createEventDto: CreateEventDto) {
  return this.eventsService.createEvent(createEventDto);
}

  @Put(':id')
  @ApiOperation({ summary: '編輯活動資訊' })
  @ApiResponse({ status: 200, description: '活動更新成功' })
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '刪除活動' })
  @ApiResponse({ status: 200, description: '活動刪除成功' })
  deleteEvent(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
