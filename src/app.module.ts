
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig,  } from '@nestjs/apollo';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { OrgPatientModule } from './org-patient/org-patient.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: true
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:
        'mongodb+srv://maribe:maribe@cluster0.nu85tvy.mongodb.net/',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    UserModule,
    OrgPatientModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
