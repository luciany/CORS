app.controller('UsersCtrl', function ($scope, $http, $location) {
	
	$scope.users;

	$scope.init = function(){
		$http.get('http://secret-gorge-4002.herokuapp.com/users', {withCredentials: true})
			.success(function(data, status, headers, config){
				$scope.users = data;
			}).error(function(data, status, headers, config){
				$location.path('/');
			});
	};

});