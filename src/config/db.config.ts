import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getDatabaseConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  return {
    uri: configService.get<string>('DB_URI'),
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };
};
