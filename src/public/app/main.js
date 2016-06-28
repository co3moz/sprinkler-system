angular.module('app').controller('ApplicationController', ['$scope', '$window', function ($scope, $window) {
  // add 'ie' classes to html
  var device;
  var isIE = !!navigator.userAgent.match(/MSIE/i);
  if (isIE) {
    angular.element($window.document.body).addClass('ie');
    device = "ie";
  } else if (isSmartDevice($window)) {
    angular.element($window.document.body).addClass('smart')
    device = "smart";
  }

  $scope.app = {
    name: 'Sprinkler System',
    version: '1.1.0',
    device: device
  };



  function isSmartDevice ($window) {
    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
  }
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$cookies', '$location', '$interval', '$rootScope', function ($q, $cookies, $location, $interval, $rootScope) {
    return {
      'request': function (config) {
        config.headers['token'] = $cookies.get('token');
        return config;
      },

      'responseError': function (data) {
        if (data.status == 408 || data.status == 401) {
          $cookies.put('token', '');

          if ($rootScope.dashboardFetchTaps) {
            $interval.cancel($rootScope.dashboardFetchTaps);
            $rootScope.dashboardFetchTaps = null;
          }

          var path = $location.path();
          if (path != '/app/login') {
            $location.url('/app/login?url=' + $location.url());
          }
          $rootScope.logined = false;
        }
        return data;
      }
    };
  }]);
}]);