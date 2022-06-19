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

  describe('Create, update then delete a User', () => {
    it('should succeed', async () => {
      const response = await request(app.getHttpServer())
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

      await request(app.getHttpServer())
        .patch(`/users/${response.body.id}`)
        .send({ name: 'outro nome' })
        .expect(200)
        .expect({
          id: response.body.id,
          name: 'outro nome',
          status: 'PENDING',
        });

      await request(app.getHttpServer())
        .delete(`/users/${response.body.id}`)
        .expect(200)
        .expect({ statusCode: 200, message: 'OK' });
    });
  });
});
