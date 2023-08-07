# MonitoringDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



---

# Command Used:


$ ng new monitoring-dashboard
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? SCSS


$ ng generate component health-info

$ ng add @angular/material
? Would you like to proceed? Yes
? Choose a prebuilt theme name, or "custom" for a custom theme: Deep Purple/Amber  [ Preview: 
https://material.angular.io?theme=deeppurple-amber ]
? Set up global Angular Material typography styles? Yes  
? Include the Angular animations module? Include and enable animations

$ ng generate service services/configs/HealthApiConfigs

$ ng generate service services/status/AppHealthStatus

> To Skip the TLS/SSL Cert Validation and CORS issues in Local testing use:
$ cd C:\Program Files (x86)\Google\Chrome\Application
$ chrome.exe --user-data-dir="C:\Users\username\Desktop\LocalTest" --disable-web-security