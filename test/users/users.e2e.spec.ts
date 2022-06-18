import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { configApp } from '../../src/main.config';
import { UsersModule } from '../../src/users/users.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configApp(app);
    await app.init();
  });

  describe('Create, update then delete a User', () => {
    it('should succeed', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' })
        .expect(201)
        .expect('This action adds a new user with {"name":"nome"}');

      await request(app.getHttpServer())
        .patch('/users/10')
        .send({ name: 'nome' })
        .expect(200)
        .expect('This action updates a #10 user with {"name":"nome"}');

      await request(app.getHttpServer())
        .delete('/users/10')
        .expect(200)
        .expect('This action removes a #10 user');
    });
  });
});
