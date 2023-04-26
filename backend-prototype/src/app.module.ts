import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { QueuesModule } from './queues/queues.module';
import { OutagesModule } from './outages/outages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    QueuesModule,
    OutagesModule,
    AuthModule,
  ],
})
export class AppModule {}
