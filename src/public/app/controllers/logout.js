app.controller('LogoutController', ['$scope', '$http', '$timeout', '$localStorage', '$location', '$rootScope', function ($scope, $http, $timeout, $localStorage, $location, $rootScope) {
  console.log("Logout Controller worked.");

  if (!$localStorage.token) {
    $location.url('/app/login');
    $rootScope.logined = false;
    return;
  }

  $http.post('/logout');
  $timeout(function () {
    $localStorage.token = '';

    $location.url('/app/login');
    $rootScope.logined = false;
  }, 50);
}]);