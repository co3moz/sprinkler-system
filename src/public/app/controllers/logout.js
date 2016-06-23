app.controller('LogoutController', ['$scope', '$http', '$timeout', '$cookies', '$location', '$rootScope', function ($scope, $http, $timeout, $cookies, $location, $rootScope) {
  console.log("Logout Controller worked.");

  if (!$cookies.get('token')) {
    $location.url('/app/login');
    $rootScope.logined = false;
    return;
  }

  $http.post('/logout');
  $timeout(function () {
    $cookies.put('token', '');

    $location.url('/app/login');
    $rootScope.logined = false;
  }, 50);
}]);