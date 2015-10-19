angular.module('stackOverflow', []);
angular.module('stackOverflow')
  .factory('stackService', function($http, $q) {
    return {
      getUser: function(user) {
        var delay = $q.defer();

        var queryString = '';

        $http.get('https://api.stackexchange.com/2.2/users/' + user + '?site=stackoverflow')
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      },
      getBadges: function(user) {
        var delay = $q.defer();

        var queryString = '';

        $http.get('https://api.stackexchange.com/2.2/users/' + user + '/badges?order=desc&sort=rank&site=stackoverflow')
          .success(function(data) {
            delay.resolve(data);
          });

        return delay.promise;
      }
    };
  })
  .directive('stackOverflow', function(stackService) {
    return {
      templateUrl: 'user-list.html',
      link: function($scope, elem, attrs) {
        var userId = attrs.userId;
        stackService.getUser(userId).then(function(data) {
          $scope.users = data.items;
        });
      }
    };
  })
  .directive('stackBadges', function(stackService) {
    return {
      templateUrl: 'badge-list.html',
      link: function($scope, elem, attrs) {
        var userId = attrs.userId;
        stackService.getBadges(userId).then(function(data) {
          $scope.badges = data.items;
        });
      }
    };
  });