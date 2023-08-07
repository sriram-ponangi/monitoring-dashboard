export interface AllEnvHealthApiConfigs {
    allEnvHealthApiConfigs: HealthApiConfigs[];
  }

export interface HealthApiConfigs {
    environment: string;
    configs: AppHealthApiConfig[];
}
  
export interface AppHealthApiConfig {
    appName: string;
    hostname: string;
    apiEndpoint: string;
}

