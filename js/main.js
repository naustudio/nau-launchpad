/* © 2014 NauStud.io
 * @author Thanh Tran
 */
(function(doc, win) {
	'use strict';
	var form = doc.getElementById('web-search');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var query = doc.getElementById('web-search-input').value;

		query = encodeURIComponent(query);
		win.location = 'https://www.google.com.vn/search?q=' + query;

	});

})(document, window);
