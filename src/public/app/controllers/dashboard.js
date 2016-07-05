app.controller('DashboardController', ['$scope', '$http', '$interval', '$location', 'sweet', function ($scope, $http, $interval, $location, sweet) {
  console.log("Dashboard Controller worked.");

  $scope.taps = [];
  var completed = true;
  var fetchInterval;

  $scope.fetchTaps = function () {
    if (completed == false) return;

    if ($location.path() != '/app/dashboard') {
      $interval.cancel(fetchInterval);
    }
    completed = false;
    $http.get('/fetch/merged', {
      etag: true,
      headers: {
        'Cache-Control': 'max-age=0'
      }
    }).cache((data) => {
      completed = true;

      $scope.active = data.status.active;
      $scope.paused = data.status.paused;
      $scope.start = new Date(data.status.start);
      $scope.startDate = $scope.start.toLocaleString();
      $scope.startFromNow = moment(data.status.start).fromNow();
      $scope.taps = data.taps;
      $scope.events = data.events;
    }).then(function (data) {
      completed = true;

      $scope.active = data.data.status.active;
      $scope.paused = data.data.status.paused;
      $scope.start = new Date(data.data.status.start);
      $scope.startDate = $scope.start.toLocaleString();
      $scope.startFromNow = moment(data.data.status.start).fromNow();
      $scope.taps = data.data.taps;
      $scope.events = data.data.events;
    });
  };


  fetchInterval = $interval($scope.fetchTaps, 3000);

  $scope.startSprinkler = function () {
    sweet.show({
      title: 'Emin misiniz?',
      text: 'Sistem seçmiş olduğunuz alanları sulamaya başlayacak.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: "green",
      confirmButtonText: "Evet, başlat!",
      cancelButtonText: "Hayır, başlatma!",
      closeOnConfirm: false,
      closeOnCancel: true
    }, function () {
      $http.get('/control/start').then(function () {
        sweet.show({
          type: 'success',
          title: 'Başlatılıyor..',
          timer: 500,
          showConfirmButton: false
        });
        $scope.fetchTaps();
      });
    });
  };

  $scope.waitSprinkler = function () {
    $http.get('/control/pause').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.stopSprinkler = function () {
    $http.get('/control/stop').then(function () {
      $scope.fetchTaps();
    });
  };

  $scope.fetchTaps();
}]);
