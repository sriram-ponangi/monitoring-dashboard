import { Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HealthInfo } from '../models/health-info.model';
import { AppHealthApiConfig, HealthApiConfigs } from '../models/health-api-config.model';
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
  @Input() healthApiConfigs: HealthApiConfigs = {
    environment: "N/A",
    configs: []
  };

  dataSource : HealthInfo[] = DEFAULT_DATA;
  columnsToDisplay = ['appName', 'hostName', 'status', 'refresh'];


  constructor(private appHealthStatusService: AppHealthStatusService) {
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
    this.dataSource = [];
    this.healthApiConfigs.configs.forEach(appHealthApiConfig => {
      let healthInfo : HealthInfo = this.appHealthStatusService.getAppHealthStatus(appHealthApiConfig);
      this.dataSource.push(healthInfo);
    });
  }

  refreshRow(healthInfo: HealthInfo, index: number) {
    console.log("Before",this.dataSource[index]);
    
    let appHealthApiConfig: AppHealthApiConfig = {
      appName: healthInfo.appName,
      hostname: healthInfo.hostName,
      apiEndpoint: healthInfo.apiEndpoint
    }
    
    let healthInfoResponse: HealthInfo = this.appHealthStatusService.getAppHealthStatus(appHealthApiConfig)
    healthInfoResponse.expanded = true;

    this.dataSource[index] = healthInfoResponse;
    
    // using the spread operator to create a new datasource
    // instance so that the mat-table in UI notices this update
    this.dataSource = [...this.dataSource]; 

    console.log("After",this.dataSource[index]);
  }
  
}

const DEFAULT_DATA: HealthInfo[] = [
  {
    appName: "N/A",
    hostName:"N/A",
    status: "N/A",
    apiEndpoint: "N/A",
    response: {},
    expanded: false,
    refresh: false
  }
]

