import { Priority } from '@prisma/client';

export interface ICreateTaskProps {
    priority: Priority;
    title: string;
    description: string;
    completion_date: string;

}
