import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { WorkspaceService } from './workspace.service';
import { Workspace } from '../schemas/workspace.schema';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

describe('WorkspaceService', () => {
  let service: WorkspaceService;
  let model: Model<Workspace>;

  const workspaceMock = {
    _id: 'test-id',
    name: 'Test Workspace',
  };

  const updateWorkspaceDto: UpdateWorkspaceDto = {
    name: 'Updated Workspace',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspaceService,
        {
          provide: getModelToken(Workspace.name),
          useValue: {
            new: jest.fn().mockResolvedValue(workspaceMock),
            constructor: jest.fn().mockResolvedValue(workspaceMock),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkspaceService>(WorkspaceService);
    model = module.get<Model<Workspace>>(getModelToken(Workspace.name));
  });

  describe('findOne', () => {
    it('should find a workspace by id', async () => {
      jest.spyOn(model, 'findById').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(workspaceMock),
      } as any);

      const result = await service.findOne('test-id');

      expect(result).toEqual(workspaceMock);
    });
  });

  describe('update', () => {
    it('should update a workspace', async () => {
      jest.spyOn(model, 'findByIdAndUpdate').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(workspaceMock),
      } as any);

      const result = await service.update('test-id', updateWorkspaceDto);

      expect(result).toEqual(workspaceMock);
    });
  });

  describe('delete', () => {
    it('should delete a workspace', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      } as any);

      const result = await service.delete('test-id');

      expect(result).toEqual({ message: 'Workspace deleted successfully.' });
    });
  });
});
