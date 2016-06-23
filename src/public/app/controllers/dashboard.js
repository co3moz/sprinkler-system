app.controller('DashboardController', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
  console.log("Dashboard Controller worked.");

  $scope.taps = [];

  $scope.fetchTaps = function () {
    $http.get('/active').then(function (data) {
      $scope.active = data.data.active;
      $scope.start = new Date(data.data.start);
      $scope.startDate = $scope.start.toLocaleString();
      $scope.startFromNow = moment(data.data.start).fromNow();
    });

    $http.get('/taps').then(function (data) {
      $scope.taps = data.data;
    });
    console.log('Fetching taps');
  };

  $scope.startSprinkler = function () {
    $http.get('/start').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.stopSprinkler = function () {
    $http.get('/stop').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.fetchTaps();
  $interval($scope.fetchTaps, 10000);
}]);
