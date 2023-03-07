jQuery(document).ready(function($){

    $.fn.swipeNav = function(options) {
        var options = $.extend( {
            menu : this,
            menuBtn : $('.menuBtn'),
            body : $(document.body),
            menuSpeed : 300,
        }, options);

        var menuWidth = options.menu.width();
        $(document.body).css({
            'overflow-x' : 'hidden',
            'position': 'relative',
            'right' : 0
        });
        options.menu.css({
            'position' : 'fixed',
            'top' : 0,
            'right': - menuWidth + 'px',
            'width': + menuWidth + 'px',
            'height' : 100 + '%'
        });
        options.menuBtn.on('click',function(){
            options.body.toggleClass('open');
            options.menuBtn.toggleClass('visiblity-hidden');
            if(options.body.hasClass('open')){
                options.body.animate({'right' : menuWidth }, options.menuSpeed);
                options.menu.animate({'right' : 0 }, options.menuSpeed);
            } else {
                options.menu.animate({'right' : -menuWidth }, options.menuSpeed);
                options.body.animate({'right' : 0 }, options.menuSpeed);
            }
        });
    };

    //jQueryPlug-in Slide-Nav
    $('#swipeNav').swipeNav();

});