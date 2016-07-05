angular.module('app').run(['$rootScope', '$state', '$stateParams', '$location', function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}]).config(['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
  $urlRouterProvider.otherwise('/app/login');
  $stateProvider.state('app', {
    abstract: true,
    url: '/app',
    templateUrl: 'app/views/app.html',
    resolve: load(['app/controllers/header.js'])
  }).state('app.dashboard', {
    url: '/dashboard',
    templateUrl: 'app/views/dashboard.html',
    resolve: load(['app/directives/tap.js', 'app/controllers/dashboard.js'])
  }).state('app.login', {
    url: '/login',
    templateUrl: 'app/views/login.html',
    resolve: load(['app/controllers/login.js'])
  }).state('app.logout', {
    url: '/logout',
    templateUrl: 'app/views/logout.html',
    resolve: load(['app/controllers/logout.js'])
  }).state('app.changepw', {
    url: '/changepw',
    templateUrl: 'app/views/changepw.html',
    resolve: load(['app/controllers/changepw.js'])
  }).state('app.events', {
    url: '/events',
    templateUrl: 'app/views/events.html',
    resolve: load(['app/controllers/events.js'])
  });

  function load (srcs, callback) {
    return {
      deps: ['$ocLazyLoad', '$q',
        function ($ocLazyLoad, $q) {
          var deferred = $q.defer();
          var promise = false;
          srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
          if (!promise) promise = deferred.promise;
          angular.forEach(srcs, function (src) {
            promise = promise.then(function () {
              if (JQ_CONFIG[src]) {
                return $ocLazyLoad.load(JQ_CONFIG[src]);
              }
              angular.forEach(MODULE_CONFIG, function (module) {
                if (module.name == src) {
                  name = module.name;
                } else {
                  name = src;
                }
              });
              return $ocLazyLoad.load(name);
            });
          });
          deferred.resolve();
          return callback ? promise.then(function () {
            return callback();
          }) : promise;
        }]
    }
  }
}]);
