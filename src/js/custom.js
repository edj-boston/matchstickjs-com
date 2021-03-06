/*!
 * Custom JavaScript
 */

// jQuery behaviors
$(document).ready(() => {
    // Hide default H1
    $('h1#matchstick').css('display', 'none');

    // Open external links in new window
    $('a.external').click(function () {
        const url = $(this).attr('href');
        window.open(url, 'new');
        return false;
    });

    // Replace <h1> text with image
    const img = $('<img/>').attr({
        src    : '/img/logotype.png',
        class  : 'img-responsive',
        width  : 710,
        height : 132,
        alt    : 'Matchstick'
    });
    $('h1').parent().prepend(img);

    // Center badges
    $('p').first().css('text-align', 'center');

    // Clickable H2's
    $('h2').click(function () {
        const id = $(this).attr('id');
        window.location = `#${id}`;
    });
});
