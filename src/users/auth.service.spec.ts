import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  beforeEach(async () => {
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should creates a user with a salted and hashed password', async () => {
    const user = await service.signup('chadijamal@gmail.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signup with email that is in user', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'chadijamal@gmail.com', password: 'test' } as User,
      ]);

    await expect(
      service.signup('chadijamal@gmail.com', 'test'),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws an error if user signin with unused email', async () => {
    await expect(service.signin('notFound@gmail.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await expect(service.signin('jest@test.com', 'Azerty123')).rejects.toThrow(
      NotFoundException,
    );
  });
});
