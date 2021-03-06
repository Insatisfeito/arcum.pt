$(document).ready(function() {

    $('[data-hover="dropdown"]').dropdownHover();


    $(window).on('scroll load', function() {

        if ($(window).scrollTop() > 0) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');

        }
    });

    $('input, textarea').placeholder();

    $('#testimonials-carousel').carousel({
        interval: 15000
    });

    $('#activities-carousel').carousel({
        interval: 15000
    });
    $('#quotes-carousel').carousel({
        interval: 20000
    });

    smoothScroll.init();

});


$(window).load(function() {
    if (window.location.hash) {
        $("."+window.location.hash.substring(1)+"-modal").click();
    }
});

$(".bmb-modal").animatedModal({
    modalTarget: 'modalbmb',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'orange'
});
$(".gfum-modal").animatedModal({
    modalTarget: 'modalgfum',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'black'
});
$(".gmp-modal").animatedModal({
    modalTarget: 'modalgmp',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'white'
});
$(".gpum-modal").animatedModal({
    modalTarget: 'modalgpum',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'grey'
});
$(".tum-modal").animatedModal({
    modalTarget: 'modaltum',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'red'
});
$(".tunao-modal").animatedModal({
    modalTarget: 'modaltunao',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'purple'
});

$(".fitu-modal").animatedModal({
    modalTarget: 'modalfitu',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'purple'
});

$(".fuap-modal").animatedModal({
    modalTarget: 'modalfuap',
    animatedIn: 'zoomIn',
    animatedOut: 'zoomOut',
    color: 'purple'
});



$(document).ready(function() {
    $('.team-wrapper').hide();
    $('#2015').show();
    $('.team-change').click(function() {
        $('.team-wrapper').hide();
        $('#' + $(this).attr('name')).show();
    })
});

$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modaltum').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})

$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modaltunao').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})


$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modalbmb').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})

$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modalgfum').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})

$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modalgmp').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})


$('a.btn').click(function(e) {
    e.preventDefault()
        $('#modalgpum').modal({
            show: true,
            backdrop: 'static',
            keyboard: true
        })
})




$(document).keypress(function(e) {
    if (e.keyCode == 27) {

        $(".closebt").click();
    }
});









var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {

            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),

            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                };
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};

initPhotoSwipeFromDOM('.my-gallery');


$(document).ready(function() {
            var carousel = $("#carousel").waterwheelCarousel({
                flankingItems: 4,
                movingToCenter: function($item) {
                    $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
                },
                movedToCenter: function($item) {
                    $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
                },
                movingFromCenter: function($item) {
                    $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
                },
                movedFromCenter: function($item) {
                    $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
                },
                clickedCenter: function($item) {
                    $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
                }
            });

            $('#prev').bind('click', function() {
                carousel.prev();
                return false
            });

            $('#next').bind('click', function() {
                carousel.next();
                return false;
            });

            $('#reload').bind('click', function() {
                newOptions = eval("(" + $('#newoptions').val() + ")");
                carousel.reload(newOptions);
                return false;
            });

        });