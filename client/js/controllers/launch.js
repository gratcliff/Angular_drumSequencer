musicMaker.controller('LaunchController', function ($scope, $location){
	$scope.launch = function (){
		console.log('clicked');
		$location.path('main');
	}
})