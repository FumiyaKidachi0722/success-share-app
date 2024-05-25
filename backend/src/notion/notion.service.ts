// backend/src/notion/notion.service.ts

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Client } from "@notionhq/client";

@Injectable()
export class NotionService {
  private readonly notion: Client;

  constructor(private configService: ConfigService) {
    this.notion = new Client({
      auth: this.configService.get<string>("NOTION_API_KEY"),
    });
  }

  async getPosts() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "PROBLEMS_DATABASE_ID"
      ) as string,
    });
    return response.results.map((result: any) => {
      const titleProperty = result.properties?.Title?.title?.[0];
      return {
        id: result.id,
        title: titleProperty ? titleProperty.plain_text : "",
        description:
          result.properties?.Description?.rich_text?.[0]?.plain_text || "",
        category: result.properties?.Category?.select?.name || "",
        user: result.properties?.User?.people?.[0]?.name || "",
        date: result.properties?.Date?.date?.start || "",
        status: result.properties?.Status?.select?.name || "",
      };
    });
  }

  async getSuccesses() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "SOLUTIONS_DATABASE_ID"
      ) as string,
    });
    return response.results.map((result: any) => {
      const titleProperty = result.properties?.Title?.title?.[0];
      return {
        id: result.id,
        title: titleProperty ? titleProperty.plain_text : "",
        description:
          result.properties?.Description?.rich_text?.[0]?.plain_text || "",
        problemId: result.properties?.ProblemID?.relation?.[0]?.id || "",
        user: result.properties?.User?.people?.[0]?.name || "",
        date: result.properties?.Date?.date?.start || "",
        category: result.properties?.Category?.select?.name || "",
      };
    });
  }

  async createPost(title: string) {
    const response = await this.notion.pages.create({
      parent: {
        database_id: this.configService.get<string>(
          "PROBLEMS_DATABASE_ID"
        ) as string,
      },
      properties: {
        Title: {
          title: [{ text: { content: title } }],
        },
        Description: {
          rich_text: [{ text: { content: "Default description" } }],
        },
        Category: {
          select: { name: "Default category" },
        },
        User: {
          people: [{ id: "Default user ID" }],
        },
        Date: {
          date: { start: new Date().toISOString() },
        },
        Status: {
          select: { name: "Open" },
        },
      },
    });
    return response;
  }

  async createSuccess(title: string) {
    const response = await this.notion.pages.create({
      parent: {
        database_id: this.configService.get<string>(
          "SOLUTIONS_DATABASE_ID"
        ) as string,
      },
      properties: {
        Title: {
          title: [{ text: { content: title } }],
        },
        Description: {
          rich_text: [{ text: { content: "Default description" } }],
        },
        ProblemID: {
          relation: [{ id: "Default problem ID" }],
        },
        User: {
          people: [{ id: "Default user ID" }],
        },
        Date: {
          date: { start: new Date().toISOString() },
        },
        Category: {
          select: { name: "Default category" },
        },
      },
    });
    return response;
  }

  async getProblems() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "PROBLEMS_DATABASE_ID"
      ) as string,
    });
    const problems = await Promise.all(
      response.results.map(async (result: any) => {
        const titleProperty = result.properties?.Title.rich_text[0];
        const categoryProperty =
          result.properties?.Category?.multi_select || [];
        const userRelationId = result.properties?.User?.relation?.[0]?.id;

        let userName = "";

        const userResponse = await this.notion.pages.retrieve({
          page_id: userRelationId,
        });
        const userProperties = (userResponse as any).properties; // 型を明示的に any にキャスト
        userName = userProperties?.Name?.rich_text?.[0]?.plain_text || "";

        return {
          id: result.id,
          title: titleProperty ? titleProperty.plain_text : "",
          description:
            result.properties?.Description?.rich_text?.[0]?.plain_text || "",
          category: categoryProperty.map((cat: any) => cat.name),
          user: userName,
          date: result.properties?.Date?.date?.start || "",
          status: result.properties?.Status?.select?.name || "",
        };
      })
    );

    return problems;
  }

  async getSolutions() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "SOLUTIONS_DATABASE_ID"
      ) as string,
    });
    const solutions = await Promise.all(
      response.results.map(async (result: any) => {
        const titleProperty = result.properties?.Title.rich_text[0];
        const categoryProperty =
          result.properties?.Category?.multi_select || [];

        const userRelationId = result.properties?.User?.relation?.[0]?.id;

        let userName = "";

        const userResponse = await this.notion.pages.retrieve({
          page_id: userRelationId,
        });
        const userProperties = (userResponse as any).properties; // 型を明示的に any にキャスト
        userName = userProperties?.Name?.rich_text?.[0]?.plain_text || "";

        return {
          id: result.id,
          title: titleProperty ? titleProperty.plain_text : "",
          description:
            result.properties?.Description?.rich_text?.[0]?.plain_text || "",
          problemId: result.properties?.ProblemID?.relation?.[0]?.id || "",
          user: userName,
          date: result.properties?.Date?.date?.start || "",
          category: categoryProperty.map((cat: any) => cat.name),
        };
      })
    );

    return solutions;
  }

  async getUsers() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "USERS_DATABASE_ID"
      ) as string,
    });
    return response.results.map((result: any) => {
      return {
        userId: result.properties?.UserID?.rich_text?.[0]?.plain_text || "",
        name: result.properties?.Name?.title?.[0]?.plain_text || "",
        email: result.properties?.Email?.email || "",
        role: result.properties?.Role?.select?.name || "",
        dateJoined: result.properties?.DateJoined?.date?.start || "",
      };
    });
  }

  async getCategories() {
    const response = await this.notion.databases.query({
      database_id: this.configService.get<string>(
        "CATEGORIES_DATABASE_ID"
      ) as string,
    });
    return response.results.map((result: any) => {
      return {
        categoryId:
          result.properties?.CategoryID?.rich_text?.[0]?.plain_text || "",
        categoryName:
          result.properties?.CategoryName?.title?.[0]?.plain_text || "",
        description:
          result.properties?.Description?.rich_text?.[0]?.plain_text || "",
      };
    });
  }
}
