import {
  Municipality,
  MunicipalityParams,
  RealEstateLibraryApiClient,
} from "../adapter/RealEstateLibraryApiClient";

export class GetMunicipalitiesUseCase {
  constructor(private realEstateLibraryApiClient: RealEstateLibraryApiClient) {}

  async execute(params: MunicipalityParams): Promise<Municipality[]> {
    return this.realEstateLibraryApiClient.fetchMunicipalities(params);
  }
}
