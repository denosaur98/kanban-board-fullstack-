import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Task } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  allTasks() {
    return this.prisma.task.findMany() || []
  }

  createTask(task: Task) {
    const uniqueTask = this.prisma.task.findUnique({
      where: {
        title: task.title
      }
    })

    if(!uniqueTask) throw new BadRequestException({ message: 'Задача с таким названием уже существует' })

    return this.prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status
      }
    })
  }

  async changeTask(taskId: number, task: Task) {
    const currentTask = await this.prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!currentTask) throw new BadRequestException({ message: 'Задача с таким id не найдена' })

    if(task.title !== currentTask.title) {
      const taskSameTitle = await this.prisma.task.findUnique({
        where: {
          title: task.title
        }
      })

      if(taskSameTitle) throw new BadRequestException({ message: 'Задача с таким названием уже существует' })
    }

    return this.prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        title: task.title,
        description: task.description,
        status: task.status
      }
    })
  }

  removeTask(taskId: number) {
    const currentTask = this.prisma.task.findUnique({
      where: {
        id: taskId
      }
    })

    if(!currentTask) throw new BadRequestException({ message: 'Задача с таким id не найдена' })

    return this.prisma.task.delete({
      where: { 
        id: taskId
      }
    })
  }
}
