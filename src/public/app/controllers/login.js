app.controller('LoginController', ['$scope', '$http', '$timeout', '$localStorage', '$location', '$rootScope', function ($scope, $http, $timeout, $localStorage, $location, $rootScope) {
  console.log("Login Controller worked.");

  if ($localStorage.token) {
    $location.url('/app/dashboard');
    $rootScope.logined = true;
    return;
  }

  $scope.loginClass = "";

  $scope.login = function () {
    $scope.loginClass = "loading";
    $scope.message = "Giriş yapılıyor..";

    $http.post('/login', {
      account: $scope.userName,
      password: $scope.userPassword
    }).then(function (data) {
      $timeout(function () {
        $scope.loginClass = "loading ok";
        $scope.message = "Giriş yapıldı!. Yönlendiriliyorsunuz..";

        $localStorage.token = data.data.code;
        $timeout(function () {
          $rootScope.logined = true;
          var search = $location.search().url;
          if (search) {
            $location.url(search);
          } else {
            $location.url('/app/dashboard');
          }
        }, 1000);
      }, 1000);
    }, function (err) {
      if (err.status != 500) {
        $timeout(function () {
          $scope.loginClass = "error";
          $scope.message = "Bilgileriniz hatalı";
        }, 1000);
      } else {
        if (err.status != 500) {
          $timeout(function () {
            $scope.loginClass = "error";
            $scope.message = "Sistemimizde bir arıza vardır, daha sonra tekrar giriş yapmayı deneyin.";
          }, 1000);
        }
      }
    });
  };
}]);