app.controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
  console.log("Dashboard Controller worked.");

  $scope.taps = [];

  $http.get('/active').then(function (data) {
    $scope.active = data.data.active;
    $scope.start = new Date(data.data.start);
    $scope.startFromNow = moment(data.data.start).fromNow();
  });

  $http.get('/taps').then(function (data) {
    $scope.taps = data.data;
  });
}]);
