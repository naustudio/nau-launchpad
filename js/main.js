/* © 2014 NauStud.io
 * @author Thanh Tran
 */
(function(doc, win) {
	'use strict';

	// For fun, displaying Nau ASCII Art:
	var ASCII_ART = '   _.._             _.._           .--┐\n .`--.  \'.        .\'  .-`\'.       |   |\n.   .-\\   \\  (`) .   /-.   \\      |   |\n|   |  \\   \\     |   |  \\   \\     |   |\n|   |   \\   \\    |   |   \\   \\    |   |\n|   |    \\   \\   |   |    \\   \\   |   |\n|   |     \\   \\  |   |     \\   \\  |   |\n|   |      \\   `-/   |      \\   \\-\'   |\n|   |       \\_.-`   ,\'  (`)  \\   `-._.\'\n└--`         `-...-`          `-...-`\nNau Studio';
	console.info(ASCII_ART);

	var form = doc.getElementById('web-search');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var query = doc.getElementById('web-search-input').value;

		query = encodeURIComponent(query);
		win.location = 'https://www.google.com.vn/search?q=' + query;

	});

})(document, window);
