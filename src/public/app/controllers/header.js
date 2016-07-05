app.controller('HeaderController', ['$scope', '$rootScope', '$http', '$localStorage', 'sweet', '$location', function ($scope, $rootScope, $http, $localStorage, sweet, $location) {
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

  if ($localStorage.token) {
    $rootScope.logined = true;
  }

  $scope.isActive = function (url) {
    return $location.path() == url;
  };

  $scope.emergency = function () {
    sweet.show({
      title: 'Emin misiniz?',
      text: 'Sistemi sıfırlama sonunda sistem değerleri sıfırlayacak, pinleri kapatacak, ve restart atacaktır.',
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Evet, sıfırla!",
      cancelButtonText: "Hayır, sıfırlama!",
      closeOnConfirm: false,
      closeOnCancel: true
    }, function () {
      $http.get('/control/reset').then(function () {
        sweet.show({
          type: 'error',
          title: 'Sıfırlanıyor..',
          timer: 10000,
          showConfirmButton: false
        });
      });
    });
  }
}]);