app.controller('EventController', ['$scope', '$http', 'sweet', '$location', function ($scope, $http, sweet, $location) {
  console.log("Event Controller worked.");

  $scope.page = parseInt($location.search().page);
  if (isNaN($scope.page)) $scope.page = 0;

  $scope.range = function (count) {
    var ratings = [];
    for (var i = 0; i < count; i++) ratings.push(i);
    return ratings;
  };

  $scope.changePage = function (page) {
    if (page == '...') return;
    $scope.page = page - 1;

    $scope.fetchData();
  };

  $scope.pagination = function (c, m) {
    c += 1;
    m = parseInt(m / 10) + 1;
    var current = c, last = m, delta = 2, left = current - delta, right = current + delta + 1, range = [], rangeWithDots = [], l, i;

    for (i = 1; i <= last; i++) if (i == 1 || i == last || i >= left && i < right) range.push(i);
    for (m = 0; m < range.length; m++) {
      i = range[m];
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  $scope.fetchData = function () {
    $http.get('/events', {
      params: {
        page: $scope.page
      }
    }).then(function (data) {
      $scope.events = data.data;
      $scope.totalRows = data.headers('totalRows');
      $scope.endingRow = Math.min($scope.page * 10 + 10, $scope.totalRows);
      $scope.nextRow = Math.min($scope.page + 1, parseInt($scope.totalRows / 10));
      $scope.nextRow = Math.max($scope.page + 1, 0);
    });
  };

  $scope.fetchData();
}]);