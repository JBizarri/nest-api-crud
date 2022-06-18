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

  describe('Users resource (SUCCESS)', () => {
    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect('This action returns all users');
    });

    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' })
        .expect(201)
        .expect('This action adds a new user with {"name":"nome"}');
    });

    it('/users/:id (PATCH)', () => {
      return request(app.getHttpServer())
        .patch('/users/10')
        .send({ name: 'nome' })
        .expect(200)
        .expect('This action updates a #10 user with {"name":"nome"}');
    });

    it('/users/:id (DELETE)', () => {
      return request(app.getHttpServer())
        .delete('/users/20')
        .expect(200)
        .expect('This action removes a #20 user');
    });

    it('/users/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/users/30')
        .expect(200)
        .expect('This action returns a #30 user');
    });
  });

  describe('Users resource (ERRORS)', () => {
    it('/users (DELETE) unmapped method', () => {
      return request(app.getHttpServer()).delete('/users').expect(404);
    });

    it('/users (POST) without body', () => {
      return request(app.getHttpServer()).post('/users').expect(400);
    });

    it('/users (POST) wrong body', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ nome: true })
        .expect(400);
    });

    it('/users/:id (PATCH) wrong body', () => {
      return request(app.getHttpServer())
        .patch('/users/10')
        .send({ name: true })
        .expect(400);
    });

    it('/users/:id (PATCH) wrong id', () => {
      return request(app.getHttpServer())
        .patch('/users/20a')
        .send({ name: 'nome' })
        .expect(400);
    });

    it('/users/:id (DELETE) wrong id', () => {
      return request(app.getHttpServer()).delete('/users/30b').expect(400);
    });

    it('/users/:id (GET) wrong id', () => {
      return request(app.getHttpServer()).get('/users/40c').expect(400);
    });

    it('/users/:id (POST) unmapped endpoint', () => {
      return request(app.getHttpServer())
        .post('/users/40/unmapped-action')
        .expect(404);
    });
  });
});
