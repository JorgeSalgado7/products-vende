import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {

  const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
    .setTitle('ms-products')
    .setDescription('ms-products API documentation')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

	app.setGlobalPrefix('v1')
	app.enableCors();

  await app.listen(process.env.PORT ?? 3000)

}
bootstrap();
