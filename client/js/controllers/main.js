musicMaker.controller('MainController', function ($scope, $window, $location, $localStorage){
//Create sequence
	// $scope.rows = ['kick', 'snare', 'clap', 'h_tom', 'l_tom', 'hi_hat'];
	var sequence = {};
	for (var i = 1; i <=16; i++){
		sequence[i] = [];
	}
//Establish playback parameters
	var playInterval;
	var count = 1;
	$scope.volume = 100;
	$scope.tempo = 128;
	$scope.currentBeat;
	$scope.current_sound;
	$scope._playing = false;
	$scope.error = "";
	$scope.isLooping = false;

//Load local sounds
	var sounds = ['../beats/snare.wav', '../beats/clap.wav', '../beats/kick.wav', '../beats/high_tom.wav', '../beats/low_tom.wav', '../beats/hi_hat.wav', '../beats/goat.wav'];
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

//Assign value to selected and play select to user
	$scope.sound = function (name){
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

	$scope.assign = function (node){
		var newsound = $scope.current_sound;
		//For clarity
		var node = node
		if (newsound){
			console.log("Node: " + node + ', sound: ' + newsound._src);
		}
		if(newsound == undefined){
			console.log("Node: " + node);
		}
		//if key exists
		if (sequence[node] != undefined && newsound){
			sequence[node].push(newsound);
		}
		//if key doesn't exist
		if (sequence[node] == undefined && newsound){
			sequence[node] = [newsound];
		}
		//Unassign values
		// for (var i = 0; i < sequence[node].length; i++){
		// 	if (sequence[node[i]] == newsound){
		// 		console.log(sequence[node[i]])
		// 		console.log('Removing note');
		// 		sequence[node[i]].splice(newsound);
		// 	}
		// }
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
	$scope.updateTempo = function (){
		// console.log($scope.tempo);
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
				console.log($scope.currentBeat);
				if (count == 17) {
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
			$scope.loop();
			return 'Already playing'
		}
	}

//Stop the loop
	$scope.stop = function (){
		clearInterval(playInterval);
		count = 1;
		$scope._playing = false;
		console.log('Stopped playback')
	}

})