import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsArray()
  @IsOptional()
  conversationHistory?: Array<{ role: string; content: string }>;
}

export class ChatResponseDto {
  message: string;
  conversationHistory: Array<{ role: string; content: string }>;
  suggestedProducts?: any[];
}
