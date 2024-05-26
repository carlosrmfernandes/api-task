import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import CheckAndValidations from '../middlewares/ChecksAndValidations';

const appRouter = Router();

const taskController = new TaskController();
const checkAndValidations = new CheckAndValidations();

appRouter.post(
    '/task', 
    checkAndValidations.checkMandatoryData, 
    checkAndValidations.validateData, 
    taskController.create
)

appRouter.get(
    '/tasks',
    taskController.index
);


appRouter.get(
    '/task/:taskId',
    taskController.show
);

appRouter.delete(
    '/task/:taskId',
    taskController.delete
);

appRouter.put(
    '/task/:taskId',
    taskController.update
);

appRouter.get(
    '/test-api',
    (req, res) => {
        return res.send('api rodando');
    }
);

export { appRouter };