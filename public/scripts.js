var app = angular.module('mrchung', [
  'ui.router',
  'tableSort',
  'ngFileUpload'
]);

function objToSet(obj) {
  return Object.keys(obj).filter(k => obj[k] === true);
}

function setToObj(set) {
  var ret = {};
  set.forEach(function(el) {
    ret[el] = true;
  });
  return ret;
}

function adaptMongooseToNg(data) {
  data.reactivityC = setToObj(data.reactivityC);
  data.reactivityS = setToObj(data.reactivityS);
  data.reactivityM = setToObj(data.reactivityM);
  return data;
}

function adaptNgToMongoose(data) {
  data.reactivityC = objToSet(data.reactivityC);
  data.reactivityS = objToSet(data.reactivityS);
  data.reactivityM = objToSet(data.reactivityM);
  return data;
}

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
    })
    .state('edit', {
      url: '/profile/:id/edit',
      controller: 'EditCtrl',
      templateUrl: 'templates/edit.html'
    })
    .state('profile', {
      url: '/profile/:id',
      controller: 'ProfileCtrl',
      templateUrl: 'templates/profile.html'
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

app.controller('CreateCtrl', function($scope, $http, $location) {
  $scope.data = {
    reactivityC: {},
    reactivityS: {},
    reactivityM: {},
    compatibility: {}
  };

  $scope.submit = function() {
    $http.post('/antibodies', adaptNgToMongoose($scope.data)).success(function(data) {
      alert('Submitted!');
      $location.path('/');
    });
  };
});

app.controller('EditCtrl', function($scope, $http, $location, $stateParams) {
  $scope.data = {
    reactivityC: {},
    reactivityS: {},
    reactivityM: {},
    compatibility: {}
  };
  $http.get('/antibodies/' + $stateParams.id).success(function(data) {
    $scope.data = adaptMongooseToNg(data);
  });

  $scope.submit = function() {
    $http.put('/antibodies/' + $stateParams.id, adaptNgToMongoose($scope.data)).success(function(data) {
      alert('Submitted!');
      $location.path('/');
    });
  };
});

app.controller('ProfileCtrl', function($scope, $stateParams, $http) {
  $http.get('/antibodies/' + $stateParams.id).success(function(data) {
    $scope.antibody = data;
  });
});

angular.module('myApp', []).config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://youtube.com/**'
  ]);