$(document).ready(function() {

	// Open external links in new window
	$('a.external').click(function(e) {
		var url = $(this).attr('href');
		window.open(url, 'new');
		return false;
	});

	// 
	var h1 = $('h1').get(0);
	var header = $(h1).html().substring(0, 10);
	var badge = $(h1).html().substring(11, h1.length);

	$(h1).html('<span class="match">' + header.substring(0, 5) + '</span>'
		+ '<img id="matchstick" src="/img/matchstick.png" width="80">'
		+ '<span class="stick">' + header.substring(5, 10) + '</span>');
	//alert(badge);

});