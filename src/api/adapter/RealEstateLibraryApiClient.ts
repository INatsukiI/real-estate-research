import { ApiError } from "next/dist/server/api-utils";

export interface MunicipalityParams {
  area: string; // 都道府県コード（必須）
  language?: "ja" | "en"; // 出力言語
}

export interface Municipality {
  id: string; // 市区町村コード
  name: string; // 市区町村名
}

/**
 * 不動産情報ライブラリAPIクライアント
 */
export class RealEstateLibraryApiClient {
  private readonly baseUrl = process.env.REAL_ESTATE_BASE_URL;
  private readonly apiKey = process.env.REAL_ESTATE_API_KEY;
  /**
   * 都道府県内市区町村一覧を取得
   */
  async fetchMunicipalities(
    params: MunicipalityParams
  ): Promise<Municipality[]> {
    // 都道府県コードのバリデーション
    if (!params.area || !/^\d{2}$/.test(params.area)) {
      throw new ApiError(400, "Invalid area code. Must be a 2-digit number.");
    }

    const queryParams = new URLSearchParams({
      area: params.area,
      ...(params.language && { language: params.language }),
    });

    try {
      const response = await fetch(`${this.baseUrl}/XIT002?${queryParams}`, {
        headers: {
          "Ocp-Apim-Subscription-Key": `${this.apiKey}`,
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 400:
            throw new ApiError(400, "Bad Request: Invalid parameters");
          case 401:
            throw new ApiError(401, "Unauthorized: Invalid API key");
          case 404:
            throw new ApiError(404, "Not Found: Invalid API endpoint");
          default:
            throw new ApiError(
              response.status,
              `API request failed with status: ${response.status}`
            );
        }
      }

      return response.json() as Promise<Municipality[]>;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      console.error("Error fetching municipalities:", error);
      throw new ApiError(500, "Internal Server Error");
    }
  }
}
