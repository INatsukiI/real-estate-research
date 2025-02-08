import { Env } from "hono/types";

export interface EnvironmentVariables {
  REAL_ESTATE_BASE_URL: string;
  REAL_ESTATE_API_KEY: string;
}
export class Environments {
  private static instance: Environments;
  private readonly variables: EnvironmentVariables;
  private constructor(EnvironmentVariables: EnvironmentVariables) {
    this.variables = EnvironmentVariables;
  }

  static initialize(env: Env): void {
    // 必須の環境変数をチェック
    const variables = env as EnvironmentVariables;
    Environments.instance = new Environments(variables);
  }

  static getInstance(): Environments {
    if (!Environments.instance) {
      throw new Error("Environment has not been initialized");
    }
    return Environments.instance;
  }

  get realEstateBaseUrl(): string {
    return this.variables.REAL_ESTATE_BASE_URL;
  }

  get realEstateApiKey(): string {
    return this.variables.REAL_ESTATE_API_KEY;
  }
}
