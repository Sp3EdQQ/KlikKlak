import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto, ChatResponseDto } from './chatbot.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  async chat(@Body() chatMessageDto: ChatMessageDto): Promise<ChatResponseDto> {
    return this.chatbotService.chat(chatMessageDto);
  }
}
