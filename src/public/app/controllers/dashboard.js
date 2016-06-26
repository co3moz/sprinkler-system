app.controller('DashboardController', ['$scope', '$http', '$interval', '$rootScope', function ($scope, $http, $interval, $rootScope) {
  console.log("Dashboard Controller worked.");

  $scope.taps = [];

  $scope.fetchTaps = function () {
    $http.get('/active').then(function (data) {
      $scope.active = data.data.active;
      $scope.paused = data.data.paused;
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

  $scope.waitSprinkler = function () {
    $http.get('/pause').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.stopSprinkler = function () {
    $http.get('/stop').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.fetchTaps();

  if ($rootScope.dashboardFetchTaps) {
    $interval.cancel($rootScope.dashboardFetchTaps);
    $rootScope.dashboardFetchTaps = null;
  }
  $rootScope.dashboardFetchTaps = $interval($scope.fetchTaps, 6000);
}]);
