angular.module('app').constant('JQ_CONFIG', {}).constant('MODULE_CONFIG', [
  {
    name: 'ngGrid',
    files: [
      'vendor/angular/ng-grid/build/ng-grid.min.js',
      'vendor/angular/ng-grid/ng-grid.min.css',
      'vendor/angular/ng-grid/ng-grid.bootstrap.css'
    ]
  }
]).config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: true,
    modules: MODULE_CONFIG
  });
}]);
