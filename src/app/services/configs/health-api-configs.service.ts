import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllEnvHealthApiConfigs } from 'src/app/models/health-api-config.model';


@Injectable({
  providedIn: 'root'
})
export class HealthApiConfigsService {

  private URL = 'assets/HealthAPIs.json';
  private SAMPLE_URL = 'assets/SampleHealthAPIs.json';

  constructor(private http: HttpClient) {
  }
  
  getAllHealthApiConfigs(): Observable<AllEnvHealthApiConfigs> {
    return this.http.get<AllEnvHealthApiConfigs>(this.SAMPLE_URL);
  }

}
