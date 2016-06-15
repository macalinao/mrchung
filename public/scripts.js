var app = angular.module('mrchung', [
  'ui.router',
  'tableSort',
  'naif.base64',
  'ngFileUpload'
]);

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
      url: '/edit',
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
    reactivity: {},
    compatibility: {}
  };

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
      $location.path('/');
    });
  };
});

app.controller('EditCtrl', function($scope, $http, $location, $stateParams) {
  $scope.data = {
    reactivity: {},
    compatibility: {}
  };
  $http.get('/antibodies/' + $stateParams.id).success(function(data) {
    $scope.data = adaptMongooseToNg(data);
  });

  function setToObj(set) {
    var ret = {};
    set.forEach(function(el) {
      ret[el] = true;
    });
    return ret;
  }

  function adaptMongoooseToNg(data) {
    data.compatibility = setToObj(data.compatibility);
    data.reactivity = setToObj(data.reactivity);
    data.image = {
      base64: data.image
    };
    return data;
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
      $location.path('/');
    });
  };
});

app.controller('ProfileCtrl', function($scope, $stateParams, $http) {
  $http.get('/antibodies/' + $stateParams.id).success(function(data) {
    $scope.antibody = data;
  });
});
