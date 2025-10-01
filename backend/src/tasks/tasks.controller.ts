import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  allTasks() {
    return this.tasksService.allTasks()
  }

  @Post()
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task)
  }

  @Patch('/:id')
  changeTask(@Param('id', ParseIntPipe) taskId: number, @Body() task: Task) {
    return this.tasksService.changeTask(taskId, task)
  }

  @Delete('/:id')
  removeTask(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.removeTask(taskId)
  }
}
