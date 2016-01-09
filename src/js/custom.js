/* eslint prefer-arrow-callback: 0 */

/*!
 * Custom JavaScript
 */

// jQuery behaviors
$(document).ready(function() {

    // Open external links in new window
    $('a.external').click(function() {
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
    $('h1').parent().prepend(img);

    // Center badges
    $('p').first().css('text-align', 'center');

    // Clickable H2's
    $('h2').click(function() {
        window.location = '#' + $(this).attr('id');
    });
});