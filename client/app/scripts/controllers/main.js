'use strict';

app.controller('MainCtrl', function ($scope, $http, $location) {

	$scope.user = '123';
	$scope.password = '123';
	$scope.err = '';

	$scope.login = function(){

		$http({
			method: 'POST', 
			url: 'http://secret-gorge-4002.herokuapp.com/login', 
			withCredentials: true,
			data: {
				'user': $scope.user,
				'password': $scope.password
			}
		}).success(function(data, status, headers, config){
			$location.path('/users');
		}).error(function(data, status, headers, config){
			$scope.err = data;
		});

	};

});