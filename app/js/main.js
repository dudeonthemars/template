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

$('.testimonials').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    adaptiveHeight: true,
    arrows: true,
    speed: 500,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

$('.testi-2').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

let momentsJs = (function() {
    return {
        init: function() {
            moment().utcOffset(3);
        var ourDate = document.getElementById('date');
        var dates = {
            'monday': ['20:00'],
            'tuesday': ['20:00'],
            'wednesday': ['20:00'],
            'thursday': ['20:00'],
            'friday': ['20:00'],
            'saturday': ['13:00'],
            'sunday': ['13:00']
        };
        var day = moment();
        var time = dates[day.format('dddd').toLowerCase()];
        var getStr = function (today) {
            for (var i = 0; i < time.length; i++) {
                var nums = time[i].split(':');
                var current = day.set({
                    hour: nums[0],
                    minute: nums[1]
                });
                if (moment().isBefore(current)) {
                    var intro = 'УЖЕ СЕГОДНЯ';
                    if (!today) {
                        intro = 'УЖЕ ЗАВТРА';
                    }
                    document.getElementById('date_in').innerHTML = intro;
                    return current.locale('ru').format('D MMMM [в] HH:mm [МСК]');
                    break;
                }
            }
        }

        var str = getStr(true);

        if (!str) {
            day = day.add(1, 'days')
            time = dates[day.format('dddd').toLowerCase()];
            str = getStr();
        }

        ourDate.innerHTML = str;
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
momentsJs.init();