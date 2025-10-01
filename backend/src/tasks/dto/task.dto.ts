import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class Task {
  @IsNumber()
  @IsNotEmpty({ message: 'ID не может быть пустым' })
  id: number;

  @IsString()
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty({ message: 'Статус не может быть пустым' })
  status: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Дата не может быть пустой' })
  createdAt: number;
}