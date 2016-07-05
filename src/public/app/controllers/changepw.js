app.controller('ChangePasswordController', ['$scope', '$http', 'sweet', '$location', function ($scope, $http, sweet, $location) {
  console.log("Change Password Controller worked.");

  $scope.degistir = function () {
    if (!$scope.sifreDegistir.$valid) return;

    $http.post('/profile/changepw', {
      oldPw: $scope.eskiSifre,
      newPw: $scope.yeniSifre
    }).then(function () {
      sweet.show({
        type: 'success',
        title: 'Şifreniz başarıyla değiştirildi..',
        timer: 1000,
        showConfirmButton: false
      });

      $location.url('/app/dashboard');
    }, function (data) {
      if (data.data == 'invalid pw') {
        sweet.show({
          type: 'error',
          title: 'Eski şifrenizi hatalı girdiniz..',
          timer: 1000,
          showConfirmButton: false
        });
      } else {
        sweet.show({
          type: 'error',
          title: 'Şifre değiştirme sırasında bir hata oluştu..',
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  }
}]);