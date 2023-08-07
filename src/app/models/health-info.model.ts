export interface HealthInfo {
    appName: string;
    hostName: string;
    status: string;
    apiEndpoint: string;
    response: any;
    expanded: boolean;
    refresh: boolean;
  }