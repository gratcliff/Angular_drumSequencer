# Javascript Drum Sequencer
[Drum sequencer](http://www.gaberatcliff.com) made with Howler.js, node, and angular.

The project is still being built out/updated. Check back to see new additions in the future!.
### Description
The app is a single-page front end drum sequencer made with angular. The sequencer was built using Angular's controller methods, although the functions could have just as easily been server side.
Angular's scope and ng-click were used heavily to get and set data from the user.
#####  Node/Express hosted server
Although the app is largely built in the front end, it relies on Node.js and Express.js to run it's server.
#####  Implementing Howler.js
Sound buffering was handled using Goldfire's [Howler.js](https://github.com/goldfire/howler.js/) library. Sounds are buffered when the user loads the page, so that there is no load time when they are set to play in sequence with Javascript's setInterval.
Sounds are loaded, and applied to the playback sequence when a user assigns them. The sequence is an object with keys for each sound node, containing values of arrays of sound objects. This enables mutliple sounds to be applied to the same note node, and multiple sounds are able to be played simultaneously.
##### Angular visualization
Once the playback was working correctly, one of the major problems was giving users visual feedback of their sound assignments, so they could confirm when they placed a sound. To correct this, I used ng-class to show elements based off their existence. 
##### Questions/Comments
If you have any questions, have noticed any bugs, or have ideas for future implementation, please feel free to PM me!
### License 
Created by Gabriel Ratcliff 2016

