var musics = require('./../controllers/musics.js');

module.exports = function (app){
	app.post('/newNote', function (req, res){
		musics.newNote(req, res);
	})
}