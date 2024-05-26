import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';


export default class TaskController {

    public async index(req: Request, res: Response) {
        try {
            
            const createTaskService = new CreateTaskService();
            const  tasks  = await createTaskService.getAllTask();
            
            return res.status(200).json({ tasks });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { ...taskBody } = req.body;

            const createTaskService = new CreateTaskService();

            const { task } = await createTaskService.execute({ ...taskBody });
            
            return res.status(200).json({ task });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    public async show(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const createTaskService = new CreateTaskService();
            const  task  = await createTaskService.getTaskById(taskId);
            
            return res.status(200).json({ task });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const { ...taskBody } = req.body;

            const createTaskService = new CreateTaskService();

            const task = await createTaskService.getTaskById(taskId);
        
            if (!task) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            const  updateTask  = await createTaskService.update(taskId, { ...taskBody });
            
            return res.status(200).json({ updateTask });
        } catch (error) {
            return res.status(400).json({ error });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const taskId = req.params.taskId;
            const createTaskService = new CreateTaskService();

            const task = await createTaskService.getTaskById(taskId);
        
            if (!task) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            const deletedTask  = await createTaskService.delete(taskId);
            
            return res.status(200).json({ deletedTask });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error });
        }
    }

}