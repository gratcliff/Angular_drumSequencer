musicMaker.controller('MainController', function ($scope, $window, $location){
//Create sequence
	//Sound container
	var sequence = {};
	//Key visualization container for angular reference
	$scope.visualizations = {};
	for (var i = 1; i <=16; i++){
		sequence[i] = [];
		$scope.visualizations[i] = [];
	}

//Establish playback parameters
	var playInterval;
	var count = 1;
	$scope.bars = 16;
	$scope.sound_name;
	$scope.current_sound;
	$scope.volume = 100;
	$scope.tempo = 128;
	$scope.currentBeat;
	$scope._playing = false;
	$scope.isLooping = false;
	$scope.clicked = true;

//Load local sounds
	var sounds = ['../beats/snare.wav', '../beats/clap.wav', '../beats/kick.wav', '../beats/high_tom.wav', '../beats/low_tom.wav', '../beats/hi_hat.wav', '../beats/Bell.wav'];
	var howls = {};
	for (var i = 0; i < sounds.length; i++){
		howls[sounds[i]] = new Howl({
			urls:[sounds[i]],
			onloaderror: function (){
				console.log('cannot load sounds');
			}
		})
		howls[sounds[i]]._buffer = true;
	}

//Select sound and play selected to user
	$scope.sound = function (name){
		$scope.clicked = false
		$scope.sound_name = name;
		_playing = true;
		//change volume to current
		howls['../beats/'+name+'.wav']._volume = $scope.volume/100;
		//preview sound for user
		howls['../beats/'+name+'.wav'].play();
		//assign sound and volume
		$scope.current_sound = howls['../beats/'+name+'.wav'];
		$scope.current_sound._volume = $scope.volume/100;
		console.log($scope.current_sound, 'Volume: ' + $scope.current_sound._volume);
	}
//Assign selected sound to nodes in sequence
	$scope.assign = function (node){
		$scope.clicked = false;
		var newsound = $scope.current_sound;
		//For clarity
		var node = node;

		var exists = false;
		//Unassign values
		for (var i = 0; i < sequence[node].length; i++){
			if (newsound == sequence[node][i]){
				sequence[node].splice(i, 1);
				$scope.visualizations[node].splice(i, 1);
				var exists = true;
			}
		}
		//Assign values
		if (exists == false){
			if (newsound){
				console.log("Node: " + node + ', sound: ' + newsound._src);
			}
			if(newsound == undefined){
				console.log("Node: " + node);
			}
			//if key exists
			if (sequence[node] != undefined && newsound){
				sequence[node].push(newsound);
				$scope.visualizations[node].push($scope.sound_name);
			}
			//if key doesn't exist
			if (sequence[node] == undefined && newsound){
				sequence[node] = [newsound];
				$scope.visualizations[node] = [$scope.sound_name];
			}
		}
	}

//Clear -- reestablishes base sequence
	$scope.clear = function(){
		sequence = {};
		$scope.visualizations = {};
		for (var i = 1; i <= $scope.bars; i++){
			sequence[i] = [];
			$scope.visualizations[i] = [];
		}
		$scope.stop()
		$scope.currentBeat = 0;
	}

//Update values
	$scope.updateVolume = function (){
		var volume = $scope.volume/100;
		for (key in sequence){
			for (var i = 0; i < sequence[key].length; i++){
				if (sequence[key][i]){
					sequence[key][i]._volume = volume;
				}			
			}
		}
	}

	$scope.loop = function (){
		clearInterval(playInterval);
		$scope._playing = false;
		$scope.play();
	}

//Play function with loop capability
	$scope.play = function (){
		$scope.currentBeat = 1;
		if($scope._playing == false){
			$scope._playing = true;
			if($scope.isLooping == false){
				for (var i = 0; i < sequence[1].length; i++){
					if (sequence[1][i]){
						sequence[1][i].play();
					}			
				}
			}
			playInterval = setInterval(function (){
				count++;
				$scope.currentBeat = count;
				$scope.$apply();
				if (count == $scope.bars + 1) {
					count = 1;
					$scope.isLooping = true;
					$scope.loop();
				}
				for (var i = 0; i < sequence[count].length; i++){
					if (sequence[count][i]){
						sequence[count][i].play();
					}			
				}
			}, (1000/$scope.tempo) * 30);
			console.log('Playing sequence', $scope.tempo)
		}
		else if ($scope._playing == true){
			count = 1;
			$scope.isLooping = false;
			$scope.loop();
			return 'Already playing'
		}
	}

//Stop the loop
	$scope.stop = function (){
		clearInterval(playInterval);
		count = 1;
		$scope._playing = false;
		$scope.isLooping = false;
		//set current beat out of range so it doesn't display
		$scope.currentBeat = 0;
	}
//Add length
	$scope.addBar = function () {
		console.log($scope.bars);
		if ($scope.bars == 16){
			for (var i = 17; i <= 32; i++){
				$scope.bars = 32;
				sequence[i] = [];
				$scope.visualizations[i] = [];
			}
		}
		else if ($scope.bars == 32){
			for (var i = 33; i <= 48; i++){
				$scope.bars = 48;
				sequence[i] = [];
				$scope.visualizations[i] = [];
			}
		}
		else {
			$scope.error = "Cannot add anymore bars"
		}
	}

})