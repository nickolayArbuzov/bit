import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PriceSeeder } from './features/price/seeder';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const priceSeeder = app.get(PriceSeeder);
  await priceSeeder.seedIfNeeded();

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('my-tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, document);
  await app.listen(5001, '0.0.0.0');
}
bootstrap();
