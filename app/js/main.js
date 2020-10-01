$(document).on('ready', function() {

    //  WOW Transitions
    if ($(window).width() > 767) {
        wow = new WOW({
            boxClass: 'wow', // default
            offset: 200, // default
            mobile: true, // default
            live: true // default
        })
        wow.init();
    }

    // smooth scroll
    $("body").on("click", "a.btn", function() {
        var idtop = $($(this).attr("href")).offset().top;
        $('html,body').animate({
            scrollTop: idtop
        }, 600);
        return false;
    });

});

// count-down digits
let countDown = (function() {
    return {
        init: function() {
            var a = 0;
            $(window).on('scroll', function() {
                var oTop = $('#count_down').offset().top - window.innerHeight;
                if (a == 0 && $(window).scrollTop() > oTop) {
                    $('.count-down__value').each(function() {
                        var $this = $(this),
                            countTo = $this.attr('data-count');
                        $({
                            countNum: $this.text()
                        }).animate({
                            countNum: countTo
                        }, {
                            duration: 2000,
                            easing: 'swing',
                            step: function() {
                                $this.text(Math.floor(this.countNum))
                            },
                            complete: function() {
                                $this.text(this.countNum)
                            }
                        })
                    });
                    a = 1
                }
            })
        }
    }
})();

// let loadBg = ( function() {
//     let target = document.querySelector('.content-1__mobile-bg');
//     $(window).on('scroll', function () {
//         if ($(window).scrollTop() > 100 ) {
//             target.classList.add('is-fadeIn');
//         }
//     })
// })();

$(document).mouseleave(function (e) {
    if (e.clientY < 10) {
        $(".modal-popup").fadeIn("fast");
        if ($(".modal-popup").length) {
            $('body').addClass('fixed');
        };
    }
});
$(document).click(function (e) {
    if (($(".modal-popup").is(':visible')) && (!$(e.target).closest(".modal-popup .modal-popup__content").length)) {
        $(".modal-popup").remove();
        $('body').removeClass('fixed');
    }
});

countDown.init();