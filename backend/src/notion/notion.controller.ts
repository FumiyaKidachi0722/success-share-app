// backend/src/notion/notion.controller.ts

import { Controller, Get, Post, Body } from "@nestjs/common";
import { NotionService } from "./notion.service";

@Controller("api/notion")
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Get("problems")
  async getProblems() {
    return this.notionService.getProblems();
  }

  @Get("solutions")
  async getSolutions() {
    return this.notionService.getSolutions();
  }

  @Post("post")
  async createPost(@Body("title") title: string) {
    return this.notionService.createPost(title);
  }

  @Post("success")
  async createSuccess(@Body("title") title: string) {
    return this.notionService.createSuccess(title);
  }
}
