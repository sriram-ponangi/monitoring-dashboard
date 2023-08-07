import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      response: {},
      status: "UNKOWN"
    }

    this.http.get<HealthInfo>(appHealthApiConfig.apiEndpoint)
    .subscribe({
      next: (data) =>  {
        healthInfo.response = data;
        healthInfo.status = "UP";
      },
      error: (e) => {
        healthInfo.response = e;
        healthInfo.status = "DOWN";
      }
    });

    return healthInfo;
  }


}
