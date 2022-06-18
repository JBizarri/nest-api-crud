import { INestApplication, ValidationPipe } from '@nestjs/common';

export function configApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { excludeExtraneousValues: true },
    }),
  );
}
