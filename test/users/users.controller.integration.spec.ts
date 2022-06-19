import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { configApp } from '@src/main.config';
import { UsersModule } from '@users/users.module';
import * as request from 'supertest';

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
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });

    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' })
        .expect(201)
        .expect((res) =>
          expect(res.body).toMatchObject({
            id: res.body.id,
            name: 'nome',
            status: 'PENDING',
          }),
        );
    });

    it('/users/:id (PATCH)', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' });

      return request(app.getHttpServer())
        .patch(`/users/${response.body.id}`)
        .send({ name: 'nome 2' })
        .expect(200)
        .expect({ id: response.body.id, name: 'nome 2', status: 'PENDING' });
    });

    it('/users/:id (DELETE)', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' });

      return request(app.getHttpServer())
        .delete(`/users/${response.body.id}`)
        .send({ name: 'nome' })
        .expect(200)
        .expect({ statusCode: 200, message: 'OK' });
    });

    it('/users/:id (GET)', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send({ name: 'nome' });

      return request(app.getHttpServer())
        .get(`/users/${response.body.id}`)
        .send({ name: 'nome' })
        .expect(200)
        .expect({ id: response.body.id, name: 'nome', status: 'PENDING' });
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
        .patch('/users/100')
        .send({ name: true })
        .expect(400);
    });

    it('/users/:id (PATCH) wrong id', () => {
      return request(app.getHttpServer())
        .patch('/users/100abc')
        .send({ name: 'nome' })
        .expect(400);
    });

    it('/users/:id (DELETE) wrong id', () => {
      return request(app.getHttpServer()).delete('/users/100abc').expect(400);
    });

    it('/users/:id (GET) wrong id', () => {
      return request(app.getHttpServer()).get('/users/100abc').expect(400);
    });

    it('/users/:id (POST) unmapped endpoint', () => {
      return request(app.getHttpServer())
        .post('/users/100/unmapped-action')
        .expect(404);
    });
  });
});
