import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NotionModule } from "./notion/notion.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotionModule,
  ],
})
export class AppModule {}
