import { RealEstateLibraryApiClient } from "../adapter/RealEstateLibraryApiClient";
import { GetMunicipalitiesUseCase } from "../usecase/GetMunicipalitiesUseCase";
import { DIContainer } from "./di-container";

export interface DependencyTypes {
  RealEstateLibraryApiClient: RealEstateLibraryApiClient;
  GetMunicipalitiesUseCase: GetMunicipalitiesUseCase;
}

const diContainer = new DIContainer<DependencyTypes>();

diContainer.register("RealEstateLibraryApiClient", RealEstateLibraryApiClient);
diContainer.register(
  "GetMunicipalitiesUseCase",
  GetMunicipalitiesUseCase,
  diContainer.get("RealEstateLibraryApiClient")
);

export { diContainer };
