import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppHealthApiConfig } from 'src/app/models/health-api-config.model';
import { HealthInfo } from 'src/app/models/health-info.model';

@Injectable({
  providedIn: 'root'
})
export class AppHealthStatusService {

  constructor(private http: HttpClient) {
  }
  
  getAppHealthStatus(appHealthApiConfig: AppHealthApiConfig): HealthInfo {
    let healthInfo: HealthInfo = {
      apiEndpoint: appHealthApiConfig.apiEndpoint,
      appName: appHealthApiConfig.appName,
      hostName: appHealthApiConfig.hostname,
      expanded: false,
      refresh: false,
      response: {},
      status: "DOWN"
    }
    
    this.http.get<HealthInfo>(appHealthApiConfig.apiEndpoint)
    .subscribe({
      next: (data) =>  {
        healthInfo.response = data;
        healthInfo.status = "UP";
      },
      error: (e) => {
        if(e instanceof HttpErrorResponse) {
          if(e['status'] === 200) {
            healthInfo.response = {
              status: "UP",
              warning: "Could not parse the API response.",
              message: e
            }
            healthInfo.status = "UP";
            return;
          }
        }
        healthInfo.response = {
          status: "DOWN",
          warning: "Failed to invoke the API.",
          message: e
        }
        healthInfo.status = "DOWN";
      }
    });

    return healthInfo;
  }


}
