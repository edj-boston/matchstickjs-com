// jQuery behaviors
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

});

// Google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-16075338-8', 'matchstickjs.com');
ga('send', 'pageview');