import { Component } from '@angular/core';
import { AllEnvHealthApiConfigs, HealthApiConfigs } from './models/health-api-config.model';
import { HealthApiConfigsService } from './services/configs/health-api-configs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  configs: AllEnvHealthApiConfigs = {allEnvHealthApiConfigs: []};
  acitveEnvironment: string;

  constructor(private healthApiConfigsService: HealthApiConfigsService) {
    this.healthApiConfigsService.getAllHealthApiConfigs().subscribe((response) => {
      this.configs = response;
    })
    this.acitveEnvironment = this.getAllEnvironments()[0];
  }

  setActiveEnvironment($event: any) {    
    this.acitveEnvironment = $event["tab"]["textLabel"]
  }

  getAllEnvironments() {
   let allEnvironments : string[] = this.configs.allEnvHealthApiConfigs.map(apiConfigs => apiConfigs.environment);
   return allEnvironments;
  }

  getHealthApiConfigsByActiveEnv() : HealthApiConfigs {
    let healthApiConfigs = this.configs.allEnvHealthApiConfigs
    .find(apiConfigs => {
      return apiConfigs.environment === this.acitveEnvironment;
    });

    if (healthApiConfigs != undefined) {
      return healthApiConfigs;
    }

    return {
      environment: "N/A",
      configs: []
    }
  }


}
