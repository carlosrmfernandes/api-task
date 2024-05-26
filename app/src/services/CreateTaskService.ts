import { PrismaClient, Task } from '@prisma/client';
import { ICreateTaskProps } from '../interfaces/ICreateUserProps';
import { CreateTaskReturnType } from '../interfaces/types/CreateTaskReturnType';
import AppError from '../libs/errors/AppError';

const prismaClient = new PrismaClient();
export default class CreateTaskService {


  public async getAllTask(): Promise<Task[]> {

    const tasks = await prismaClient.task.findMany();
    return tasks;
  }

  public async execute({ ...taskBody }: ICreateTaskProps): Promise<CreateTaskReturnType> {
    const taskData = {
      title: taskBody.title,
      description: taskBody.description,
      completion_date: taskBody.completion_date,
      priority: taskBody.priority,
    };
    
    const task = await prismaClient.task.create({
      data: {
        ...taskData,
      },
    });

    if (!task) {
      throw new AppError('Error on task registration. Task not registered.', 400);
    }

    return { task };
  }

  public async getTaskById(taskId: string): Promise<Task | null> {
    const task = await prismaClient.task.findUnique({
      where: {
        id: taskId,
      },
    });
    return task;
  }

  public async update(taskId: string, { ...taskBody }: ICreateTaskProps): Promise<Task> {

    const taskData = {
      title: taskBody.title,
      description: taskBody.description,
      completion_date: taskBody.completion_date,
      priority: taskBody.priority,
    };

    if (taskData.title) {
      const existingTask = await prismaClient.task.findUnique({
        where: { title: taskData.title },
      });

      if (existingTask && existingTask.id !== taskId) {
        throw new AppError('A task with this title already exists.', 400);
      }
    }

    const updatedTask = await prismaClient.task.update({
      where: { id: taskId },
      data: taskData,
    });

    return updatedTask;
  }

  public async delete(taskId: string): Promise<boolean> {
    const deletedTask = await prismaClient.task.delete({
      where: {
        id: taskId,
      },
    });
    return !!deletedTask;
  }
  
}
