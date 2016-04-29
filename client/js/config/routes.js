musicMaker.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '../partials/launch.html'
	})
	.when('/main', {
		templateUrl: '../partials/main.html'
	})
	.otherwise({
		redirectTo: '/'
	})
});