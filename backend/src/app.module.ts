import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppConfigModule, appConfig, redisConfig } from './config';
import { CacheModule } from './cache/cache.module';
import { EmailModule } from './email/email.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { UploadModule } from './uploads/upload.module';
import { WsModule } from './ws/ws.module';
import { VirtualAccountModule } from './virtual-account/virtual-account.module';
import { RatesModule } from './rates/rates.module';
import { SorobanModule } from './soroban/soroban.module';
import { DepositsModule } from './deposits/deposits.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    // 1. Config — global, validates all env vars at startup with abortEarly: false.
    AppConfigModule,

    // 2. Redis cache — global CacheService + ioredis client.
    CacheModule,

    // 3. Database — owns the TypeORM root connection; see database.module.ts.
    DatabaseModule,

    // 4. Bull — async Redis connection via typed RedisConfig.
    BullModule.forRootAsync({
      inject: [redisConfig.KEY],
      useFactory: (redis: ConfigType<typeof redisConfig>) => ({
        redis: {
          host: redis.host,
          port: redis.port,
          password: redis.password,
        },
      }),
    }),

    // 5. Throttler — rate limiting via typed AppConfig.
    ThrottlerModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: (app: ConfigType<typeof appConfig>) => ({
        throttlers: [
          {
            ttl: app.throttleTtl * 1000,
            limit: app.throttleLimit,
          },
        ],
      }),
    }),

    HealthModule,

    // 6. Email — async transactional delivery via ZeptoMail + BullMQ.
    EmailModule,

    // 7. Auth — register/login/refresh/logout + global JWT guard.
    AuthModule,

    // 6. File uploads — presign + confirm via Cloudflare R2.
    UploadModule,

    // 7. WebSockets — Socket.io real-time gateway.
    WsModule,

    // 7. Virtual Accounts — Flutterwave integration for NGN deposits.
    VirtualAccountModule,

    // 8. Rates — Currency conversion rates.
    RatesModule,

    // 9. Soroban — Stellar smart contract integration.
    SorobanModule,

    // 10. Deposits — Deposit records.
    DepositsModule,

    // 11. Transactions — Transaction records.
    TransactionsModule,
  ],
  providers: [
    // Global guard: every route requires a valid JWT unless decorated @Public().
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
