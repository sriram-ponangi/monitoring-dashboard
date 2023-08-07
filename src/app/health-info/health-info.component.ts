import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HealthInfo } from '../models/health-info.model';
import { HealthApiConfigsService } from '../services/configs/health-api-configs.service';
import { AllEnvHealthApiConfigs, HealthApiConfigs } from '../models/health-api-config.model';
import { AppHealthStatusService } from '../services/status/app-health-status.service';


@Component({
  selector: 'app-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HealthInfoComponent {
  @Input() environment = "UAT";

  dataSource : HealthInfo[] = DEFAULT_DATA;
  columnsToDisplay = ['appName', 'hostName', 'status'];
  configs: AllEnvHealthApiConfigs = {allEnvHealthApiConfigs: []};


  constructor(private healthApiConfigsService: HealthApiConfigsService,
     private appHealthStatusService: AppHealthStatusService) {
    this.healthApiConfigsService.getAllHealthApiConfigs().subscribe((response) => {
      this.configs = response;
    })

  }

  toggleSelectedRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  toggleAllRows(flag: boolean) {
    this.dataSource.forEach(row => {
      row.expanded = flag;
    })
  }

  refreshAllRows() {
    console.log(this.configs);
    
    let healthApiConfigs = this.configs.allEnvHealthApiConfigs
    .find(apiConfigs => {
      console.log(apiConfigs.environment, this.environment, apiConfigs.environment === this.environment);
      return apiConfigs.environment === this.environment;
    });

    console.log(healthApiConfigs);
    
    if (healthApiConfigs != undefined) {
        this.dataSource = [];
        healthApiConfigs.configs.forEach(appHealthApiConfig => {
          let healthInfo : HealthInfo = this.appHealthStatusService.getAppHealthStatus(appHealthApiConfig);
          this.dataSource.push(healthInfo);
        });

    } else {
     
      this.dataSource = DEFAULT_DATA
    }

  }

}

const DEFAULT_DATA: HealthInfo[] = [
  {
    appName: "N/A",
    hostName:"N/A",
    status: "N/A",
    apiEndpoint: "N/A",
    response: {},
    expanded: false
  }
]

