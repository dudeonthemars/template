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

    $('#content3').stellar();

    // smooth scroll
    $("body").on("click", "a.btn, a.animate, .btn-liquid, a.smooth", function() {
        var idtop = $($(this).attr("href")).offset().top;
        $('html,body').animate({
            scrollTop: idtop
        }, 600);
        return false;
    });

    //text-rotator
    $(".rotate").textrotator({
        animation: "dissolve", //  Options dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
        speed: 2000 // How many milliseconds until the next word show.
    });
    //slick
    $('.testimonials').slick({
        draggable: true,
        infinite: true,
        dots: false,
        autoplay: false,
        speed: 900,
        cssEase: 'ease-in-out',
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                    infinite: true,

                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    arrows: false,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    dots: false,
                    arrows: false
                }
            }

        ]
    });

    //readmore

    $('.testimonials p').readmore({
        speed: 300,
        moreLink: '<a href="#">Читать полностью</a>',
        lessLink: '<a href="#">Закрыть</a>',
        collapsedHeight: 240
    });

    // site preloader 
    $(window).load(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
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

// ОТСЧЕТ	
let timer = (function($) {
    return {
        init: function() {
            'use strict';
            $.countdown.regionalOptions.ru = {
                labels: ['Лет', 'Месяцев', 'Недель', 'Дней', 'Часов', 'Минут', 'Секунд'],
                labels1: ['Год', 'Месяц', 'Неделя', 'День', 'Час', 'Минута', 'Секунда'],
                labels2: ['Года', 'Месяца', 'Недели', 'Дня', 'Часа', 'Минуты', 'Секунды'],
                compactLabels: ['л', 'м', 'н', 'д'],
                compactLabels1: ['г', 'м', 'н', 'д'],
                whichLabels: function(amount) {
                    var units = amount % 10;
                    var tens = Math.floor((amount % 100) / 10);
                    return (amount === 1 ? 1 : (units >= 2 && units <= 4 && tens !== 1 ? 2 :
                        (units === 1 && tens !== 1 ? 1 : 0)));
                },
                digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                timeSeparator: ':',
                isRTL: false
            };
            $.countdown.setDefaults($.countdown.regionalOptions.ru);
            if (Cookies.get("timer") === undefined) { Cookies.set("timer", new Date(), { expires: 7 }) }
            var now = new Date();
            var timer = new Date(Cookies.get("timer"));
            timer.setMilliseconds(59 * 60 * 60 * 1000); //hours
            //timer = new Date(2019, 2 - 1, 8); // date 2019-year feb 8-day
            $('#counter div').countdown({
                until: timer,
                format: 'dHMS',
                /*onTick: showPauseTime*/
                onExpiry: noDiscount
            });

            if (timer.getTime() < now.getTime()) { noDiscount() }

            function noDiscount() {
                console.log('some function')
            }
        }
    }
})(jQuery);


// toggler 
let toggler = (function() {
    return {
        init: function() {

            let acc = document.getElementsByClassName("question");

            for (let i = 0; i < acc.length; i++) {
                acc[i].addEventListener('click', function() {
                    this.classList.toggle('active');
                    let panel = this.nextElementSibling;

                    if (panel.style.opacity === "1") {
                        panel.style.opacity = "0";
                    } else {
                        panel.style.opacity = "1";
                    }
                });
            }
        }
    }
})();

// autodateChanger
let dateChanger = (function() {
    return {
        init: function() {
            let ourDate = jQuery('.ourDate');
            let theDate = new Date(2019, 9, 14);
            let currentDate = new Date();
            let options = {
                month: 'long',
                day: 'numeric'
            };

            do {
                theDate.setDate(theDate.getDate() + 14);
            } while (currentDate > theDate);

            for (let i = 0; i <= ourDate.length; i++) {
                ourDate[i].innerHTML = theDate.toLocaleString("ru", options);
            }

        }
    }
})();

// call need scripts
countDown.init();
//timer.init();
toggler.init();
//dateChanger.init();
