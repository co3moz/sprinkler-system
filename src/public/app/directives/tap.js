app.directive("tapDirective", function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      tap: '=tap',
      isActive: '=isActive'
    },
    controller: ['$scope', '$http', 'sweet', function ($scope, $http, sweet) {
      $scope.tapClick = function (tap) {
        $http.post('/tap/' + tap.id + '/click').then(function (data) {
          $scope.tap = data.data;
        });
      };

      $scope.duration = function (duration) {
        if (duration >= 60 * 60) {
          return duration / (60 * 60) + " saat";
        }

        return duration / (60) + " dakika";
      };

      $scope.durationDate = function (duration) {
        if (duration < 60) {
          return parseInt(duration) + " saniye";
        }

        if (duration >= 60 * 60) {
          return parseInt(duration / (3600)) + " saat";
        }

        return parseInt(duration / (60)) + " dakika";
      };

      $scope.changeDuration = function (duration) {
        $http.post('/tap/' + $scope.tap.id + '/duration/' + duration).then(function (data) {
          $scope.tap = data.data;
        });
      };

      $scope.changeGPIO = function (gpio) {
        $http.post('/tap/' + $scope.tap.id + '/gpio/' + gpio).then(function (data) {
          $scope.tap = data.data;
        });
      };
      $scope.changeLine = function (line) {
        $http.post('/tap/' + $scope.tap.id + '/line/' + line).then(function (data) {
          $scope.tap = data.data;
        });
      };

      $scope.menuOptions = [

        ['Yeniden adlandır', function () {
          sweet.show({
            title: 'Yeniden Adlandır',
            text: 'Sulanacak bölgeyi adlandırmak ortamın anlaşılmasını kolaylaştırır',
            type: 'input',
            inputValue: $scope.tap.name,
            showCancelButton: true,
            closeOnConfirm: false,
            animation: 'slide-from-top',
            inputPlaceholder: 'Buraya isimi yazın'
          }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === '') {
              sweet.showInputError('Bir isim vermeniz gerekmektedir!');
              return false;
            }
            $http.post('/tap/' + $scope.tap.id + '/rename/' + inputValue).then(function (data) {
              $scope.tap = data.data;
            });
            sweet.show({
              title: 'Değişim tamamlandı',
              text: 'Güncelleniyor...',
              timer: 100,
              showConfirmButton: false
            });
          });
        }], ['Kilitle / Kilidi aç', function () {
          $http.post('/tap/' + $scope.tap.id + '/lock').then(function (data) {
            $scope.tap = data.data;
          });
        }],
        null,
        ['Yeniden sırala', function () {

        }, [
          ['#1', function () {
            $scope.changeLine(1);
          }],
          ['#2', function () {
            $scope.changeLine(2);
          }],
          ['#3', function () {
            $scope.changeLine(3);
          }],
          ['#4', function () {
            $scope.changeLine(4);
          }],
          ['#5', function () {
            $scope.changeLine(5);
          }],
          ['#6', function () {
            $scope.changeLine(6);
          }],
          ['#7', function () {
            $scope.changeLine(7);
          }],
          ['#8', function () {
            $scope.changeLine(8);
          }],
          ['#9', function () {
            $scope.changeLine(9);
          }],
          ['#10', function () {
            $scope.changeLine(10);
          }],
          ['#11', function () {
            $scope.changeLine(11);
          }],
          ['#12', function () {
            $scope.changeLine(12);
          }]
        ]],
        ['Süreyi değiştir', function () {

        }, [
          ['5 dakika', function () {
            $scope.changeDuration(60);
          }],
          ['10 dakika', function () {
            $scope.changeDuration(2 * 60);
          }],
          ['15 dakika', function () {
            $scope.changeDuration(3 * 60);
          }],
          ['20 dakika', function () {
            $scope.changeDuration(4 * 60);
          }],
          ['25 dakika', function () {
            $scope.changeDuration(5 * 60);
          }],
          ['30 dakika', function () {
            $scope.changeDuration(6 * 60);
          }],
          ['40 dakika', function () {
            $scope.changeDuration(8 * 60);
          }],
          ['50 dakika', function () {
            $scope.changeDuration(10 * 60);
          }],
          ['1 saat', function () {
            $scope.changeDuration(12 * 60);
          }]
        ]],
        ['GPIO değiştir', function () {

        }, [
          ['Sol', function () {

          }, [
            ['4 (pin 7, soldan 4.)', function () {
              $scope.changeGPIO(4);
            }],
            ['17 (pin 11, soldan 6.)', function () {
              $scope.changeGPIO(17);
            }],
            ['27 (pin 13, soldan 7.)', function () {
              $scope.changeGPIO(27);
            }],
            ['22 (pin 15, soldan 8.)', function () {
              $scope.changeGPIO(22);
            }],
            ['5 (pin 29, soldan 15.)', function () {
              $scope.changeGPIO(5);
            }],
            ['6 (pin 31, soldan 16.)', function () {
              $scope.changeGPIO(6);
            }],
            ['13 (pin 33, soldan 17.)', function () {
              $scope.changeGPIO(13);
            }],
            ['19 (pin 35, soldan 18.)', function () {
              $scope.changeGPIO(19);
            }],
            ['26 (pin 37, soldan 19.)', function () {
              $scope.changeGPIO(26);
            }]
          ]],

          ['Sağ', function () {

          }, [
            ['18 (pin 12, sağdan 6.)', function () {
              $scope.changeGPIO(18);
            }],
            ['23 (pin 16, sağdan 8.)', function () {
              $scope.changeGPIO(23);
            }],
            ['24 (pin 18, sağdan 9.)', function () {
              $scope.changeGPIO(24);
            }],
            ['25 (pin 22, sağdan 11.)', function () {
              $scope.changeGPIO(25);
            }],
            ['12 (pin 32, sağdan 16.)', function () {
              $scope.changeGPIO(12);
            }],
            ['16 (pin 36, sağdan 18.)', function () {
              $scope.changeGPIO(16);
            }],
            ['20 (pin 38, sağdan 19.)', function () {
              $scope.changeGPIO(20);
            }],
            ['21 (pin 40, sağdan 20.)', function () {
              $scope.changeGPIO(21);
            }]
          ]]
        ]]
      ];
    }],
    templateUrl: '/app/directives/tap.html'
  };
});