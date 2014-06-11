/*!
 * Custom JavaScript
 */

// jQuery behaviors
$(document).ready(function() {

	// Open external links in new window
	$('a.external').click(function(e) {
		var url = $(this).attr('href');
		window.open(url, 'new');
		return false;
	});

	// Replace <h1> text with image
	var img = $('<img/>').attr({
		src : '/img/logotype.png',
		class : 'img-responsive',
		width : 710,
		height : 132,
		alt : 'Matchstick'
	});
	$('h1#matchstick').parent().prepend(img);

	// Clickable <h2>'s
	$('h2').click(function() {
		window.location = '#' + $(this).attr('id');
	});

	// Hide Travis icon
	var travis = $('a[href="https://travis-ci.org/edj-boston/matchstick"]');
	var li = $('<li/>').html(travis);
	$('#share').append(li);
});