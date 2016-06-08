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
  function resetData() {
    $scope.data = {
      reactivity: {},
      compatibility: {}
    };
  }
  resetData();

  function objToSet(obj) {
    return Object.keys(obj).filter(k => obj[k] === true);
  }

  function adaptNgToMongoose(data) {
    data.compatibility = objToSet(data.compatibility);
    data.reactivity = objToSet(data.reactivity);
    return data;
  }

  $scope.submit = function() {
    $http.post('/antibodies', adaptNgToMongoose($scope.data)).success(function(data) {
      alert('Submitted!');
      resetData();
    });
  };
});

