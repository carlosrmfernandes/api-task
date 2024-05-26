import { PrismaClient } from '@prisma/client';
import { Priority } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import AppError from '../libs/errors/AppError';

const prismaClient = new PrismaClient();

export default class CheckAndValidations {
  public checkMandatoryData(req: Request, res: Response, next: NextFunction): void {
    const bodyData = req.body;

    if (!bodyData.title)
      throw new AppError('Type of person is needed.', 400);

    if (bodyData.priority != Priority.ALTA && bodyData.priority != Priority.MEDIA && bodyData.priority != Priority.BAIXA)
      throw new AppError('Priority is needed for ALTA, MEDIA, BAIXA .', 400);

    if (!bodyData.description) throw new AppError('Description is needed.', 400);



    next();
  }

  public async validateData(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bodyData = req.body;

      const taskTitleAlreadyRegistered = await prismaClient.task.findUnique({
        where: {
          title: bodyData.title,
        },
      });

      if (taskTitleAlreadyRegistered)
        throw new AppError('This Task title is already registered.', 400);
            
      next();
    } catch (error) {
        console.log(error);
      next(error);
    }
  }
}
