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
        if (duration >= 60 * 60 * 1000) {
          return duration / (60 * 60 * 1000) + " saat";
        }

        return duration / (60 * 1000) + " dakika";
      };

      $scope.durationDate = function (date) {
        var duration = new Date(date) - (new Date);

        if (duration < 60 * 1000) {
          return parseInt(duration / 1000) + " saniye";
        }

        if (duration >= 60 * 60 * 1000) {
          return parseInt(duration / (3600000)) + " saat";
        }

        return parseInt(duration / (60000)) + " dakika";
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
        ['Süreyi değiştir', function () {

        }, [
          ['5 dakika', function () {
            $scope.changeDuration(5 * 60 * 1000);
          }],
          ['10 dakika', function () {
            $scope.changeDuration(10 * 60 * 1000);
          }],
          ['15 dakika', function () {
            $scope.changeDuration(15 * 60 * 1000);
          }],
          ['20 dakika', function () {
            $scope.changeDuration(20 * 60 * 1000);
          }],
          ['25 dakika', function () {
            $scope.changeDuration(25 * 60 * 1000);
          }],
          ['30 dakika', function () {
            $scope.changeDuration(30 * 60 * 1000);
          }],
          ['40 dakika', function () {
            $scope.changeDuration(40 * 60 * 1000);
          }],
          ['50 dakika', function () {
            $scope.changeDuration(50 * 60 * 1000);
          }],
          ['1 saat', function () {
            $scope.changeDuration(60 * 60 * 1000);
          }]
        ]],
        ['GPIO değiştir', function () {

        }, [
          ['Sol', function () {

          }, [
            ['7 (soldan 4.)', function () {
              $scope.changeGPIO(7);
            }],
            ['11 (soldan 6.)', function () {
              $scope.changeGPIO(11);
            }],
            ['13 (soldan 7.)', function () {
              $scope.changeGPIO(13);
            }],
            ['15 (soldan 8.)', function () {
              $scope.changeGPIO(15);
            }],
            ['29 (soldan 15.)', function () {
              $scope.changeGPIO(29);
            }],
            ['31 (soldan 16.)', function () {
              $scope.changeGPIO(31);
            }],
            ['33 (soldan 17.)', function () {
              $scope.changeGPIO(33);
            }],
            ['35 (soldan 18.)', function () {
              $scope.changeGPIO(35);
            }],
            ['37 (soldan 19.)', function () {
              $scope.changeGPIO(37);
            }]
          ]],

          ['Sağ', function () {

          }, [
            ['12 (sağdan 6.)', function () {
              $scope.changeGPIO(12);
            }],
            ['16 (sağdan 8.)', function () {
              $scope.changeGPIO(16);
            }],
            ['18 (sağdan 9.)', function () {
              $scope.changeGPIO(18);
            }],
            ['22 (sağdan 11.)', function () {
              $scope.changeGPIO(22);
            }],
            ['32 (sağdan 16.)', function () {
              $scope.changeGPIO(32);
            }],
            ['36 (sağdan 18.)', function () {
              $scope.changeGPIO(36);
            }],
            ['38 (sağdan 19.)', function () {
              $scope.changeGPIO(38);
            }],
            ['40 (sağdan 20.)', function () {
              $scope.changeGPIO(40);
            }]
          ]]
        ]]
      ];
    }],
    templateUrl: '/app/directives/tap.html'
  };
});