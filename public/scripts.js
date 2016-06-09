var app = angular.module('mrchung', ['ui.router', 'tableSort', 'naif.base64']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html'
    })
    .state('create', {
      url: '/create',
      controller: 'CreateCtrl',
      templateUrl: 'templates/create.html'
    });
  $urlRouterProvider.otherwise('/');
});

app.controller('HomeCtrl', function($scope, $http) {
  $scope.query = '';
  $scope.data = [];
  $http.get('/antibodies').then(function (data) {
    $scope.data = data.data;
  });
});

app.controller('CreateCtrl', function($scope, $http) {
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
    data.image = data.image.base64;
    return data;
  }

  $scope.submit = function() {
    $http.post('/antibodies', adaptNgToMongoose($scope.data)).success(function(data) {
      alert('Submitted!');
      resetData();});
  };
});

