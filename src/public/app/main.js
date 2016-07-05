angular.module('app').controller('ApplicationController', ['$scope', '$window', function ($scope, $window) {
  // add 'ie' classes to html
  var device;
  var isIE = !!navigator.userAgent.match(/MSIE/i);
  if (isIE) {
    angular.element($window.document.body).addClass('ie');
    device = "ie";
  } else if (isSmartDevice($window)) {
    angular.element($window.document.body).addClass('smart')
    device = "smart";
  }

  $scope.app = {
    name: 'Sprinkler System',
    version: '1.2.0',
    device: device
  };


  function isSmartDevice ($window) {
    var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
    return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
  }
}]);

app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push(['$q', '$localStorage', '$location', '$interval', '$rootScope', function ($q, $localStorage, $location, $interval, $rootScope) {
    return {
      'request': function (config) {
        config.headers['token'] = $localStorage.token || "";
        return config;
      },

      'responseError': function (data) {
        if (data.status == 408 || data.status == 401) {
          $localStorage.token = "";

          var path = $location.path();
          if (path != '/app/login') {
            $location.url('/app/login?url=' + $location.url());
          }
          $rootScope.logined = false;
        }
        return $q.reject(data);
      }
    };
  }]);
}]);

app.directive('time', ['$timeout', '$filter', function ($timeout, $filter) {
  return function (scope, element, attrs) {
    var time = attrs.time;
    var intervalLength = 1000;
    var timeoutId;


    var duration = function (duration) {
      var suffix = " önce";
      if (duration < 0) {
        suffix = " sonra";
        duration = -duration;
      }

      if (!attrs.suffix) {
        suffix = "";
      }

      if (duration < 60) {
        var sure = parseInt(duration);
        return sure == 0 ? "şimdi" : sure + " sn" + suffix;
      }

      if (duration >= 60 * 60 * 24 * 30) {
        return parseInt(duration / (3600 * 24 * 30)) + " ay" + ((parseInt((duration % 3600 * 24 * 30) / 86400) != 0) ? (' ' + parseInt((duration % 3600 * 24 * 30) / 86400) + ' gün') : '') + suffix;
      }

      if (duration >= 60 * 60 * 24 * 7) {
        return parseInt(duration / (3600 * 24 * 7)) + " hafta" + ((parseInt((duration % 3600 * 24 * 7) / 86400) != 0) ? (' ' + parseInt((duration % 3600 * 24 * 7) / 86400) + ' gün') : '') + suffix;
      }

      if (duration >= 60 * 60 * 24) {
        return parseInt(duration / (3600 * 24)) + " gün" + ((parseInt((duration % 3600 * 24) / 3600) != 0) ? (' ' + parseInt((duration % 3600 * 24) / 3600) + ' sa') : '') + suffix;
      }


      if (duration >= 60 * 60) {
        return parseInt(duration / (3600)) + " sa" + ((parseInt((duration % 3600) / 60) != 0) ? (' ' + parseInt((duration % 3600) / 60) + ' dk') : '') + suffix;
      }

      return parseInt(duration / (60)) + " dk" + ((parseInt(duration % 60) != 0) ? (' ' + parseInt(duration % 60) + ' sn') : '') + suffix;
    };

    var dateDuration = function (input) {
      return duration((Date.now() - new Date(input)) / 1000);
    };

    function updateTime () {
      element.text(attrs.justDuration == "true" ? duration(time--) : dateDuration(time));
      element.attr("title", time);
    }

    function updateLater () {
      timeoutId = $timeout(function () {
        updateTime();
        updateLater();
      }, intervalLength);
    }

    element.bind('$destroy', function () {
      $timeout.cancel(timeoutId);
    });

    updateTime();
    updateLater();
  };
}]);