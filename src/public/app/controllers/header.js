app.controller('HeaderController', ['$scope', '$rootScope', '$http', '$cookies', function ($scope, $rootScope, $http, $cookies) {
  console.log("Header Controller worked.");

  $scope.$watch(function () {
    return $rootScope.logined;
  }, function () {
    $scope.logined = $rootScope.logined;
    if ($scope.logined) {
      $http.get('/profile').then(function (data) {
        $scope.profile = data.data;
      });
    }
  }, true);

  if ($cookies.get('token')) {
    $rootScope.logined = true;
  }
}]);