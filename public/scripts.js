var app = angular.module('mrchung', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html'
    });
  $urlRouterProvider.otherwise('/');
});

app.controller('HomeCtrl', function($scope, $http) {
  $scope.data = {};

  $scope.submit = function() {
    $http.post('/antibodies', $scope.data).success(function(data) {
      alert('Submitted!');
      $scope.data = {};
    });
  };
});

