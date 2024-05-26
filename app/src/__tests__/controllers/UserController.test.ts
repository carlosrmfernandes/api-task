import { Request, Response } from 'express';
import TaskController from '../../controllers/TaskController';
import CreateTaskService from '../../services/CreateTaskService';

jest.mock('../../services/CreateTaskService', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Task Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let taskController: TaskController;
  let mockExecute: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: {
        title: 'Test',
        description: 'Test',
        completion_date: '2024-05-26',
        priority: 'ALTA'        
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    taskController = new TaskController();
    mockExecute = jest.fn();
    (
      CreateTaskService as jest.MockedClass<typeof CreateTaskService>
    ).mockImplementation(() => ({
      execute: mockExecute,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a Task successfully', async () => {
      const expectedResult = {
        task: {
          id: 1,
          title: 'Test',
          description: 'Test',
          completion_date: '2024-05-26',
          priority: 'ALTA'       
        }
      };
      mockExecute.mockResolvedValueOnce(expectedResult);

      await taskController.create(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockExecute).toHaveBeenCalledWith({
          title: 'Test',
          description: 'Test',
          completion_date: '2024-05-26',
          priority: 'ALTA'       
      });
      expect(mockResponse!.status).toHaveBeenCalledWith(200);
      expect(mockResponse!.json).toHaveBeenCalledWith(expectedResult);
    });

    it('should handle errors', async () => {
        const errorMessage = 'Some error occurred';
        mockExecute.mockRejectedValueOnce(new Error(errorMessage));
      
        await taskController.create(mockRequest as Request, mockResponse as Response);
      
        expect(mockResponse!.status).toHaveBeenCalledWith(400);
        expect(mockResponse!.json).toHaveBeenCalledWith(
          expect.objectContaining({ error: expect.any(Error) })
        );
      });
  });
});