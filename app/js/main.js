$(document).on('ready', function() {

    wow = new WOW({
        boxClass: 'wow', // default
        offset: 200, // default
        mobile: false, // default
        live: true // default
    });

    wow.init();

    $(window).stellar();

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
        slidesToShow: 2,
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
                    arrows: true,
                    slidesToShow: 1,
                }
            }

        ]
    });


    $('.testimonials2').slick({
        draggable: true,
        infinite: true,
        dots: false,
        autoplay: false,
        speed: 900,
        adaptiveHeight: true,
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
                    arrows: true,
                    slidesToShow: 1,
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

let parralax = (function(){
    return {
        init: function() {
            var scene = document.getElementById('scene');
            var parallaxInstance = new Parallax(scene);
        }
    }
})();

let tabs = (function() {
    return {
        init: function () {

            let tabButton = document.querySelectorAll('.modules__btn');
            let tabContent = document.querySelectorAll('.modules__content');
            let parent = document.querySelector('.modules__tabs');
            let tabContentList = [];
            let tabButtonsList = [];

            for (i = 0; i < tabButton.length; i++) {
                tabButton[i].setAttribute('data-index', [i]);
                tabContent[i].setAttribute('data-index', [i]);
                tabContentList.push(tabContent[i]);
                tabButtonsList.push(tabButton[i]);
            }

            parent.addEventListener('click', (event)=> {
                let ourClick = event.target.parentNode;
                removeActive();
                tabContentList[ourClick.dataset.index].classList.add('is-active');
                tabButtonsList[ourClick.dataset.index].classList.add('is-active');
            });

            function removeActive() {
                for (x = 0; x < tabContentList.length; x++) {
                    tabContentList[x].classList.remove('is-active');
                    tabButtonsList[x].classList.remove('is-active');
                }
            }
        } 
    }
})();

let smooth = (function() {
    return {
        init: function() {
            const selectors = document.querySelectorAll('.smooth');

            for (const link of selectors) {
                link.addEventListener('click', scrollBehavior);
            }

            function scrollBehavior(e) {
                e.preventDefault();
                const href = this.getAttribute('href');

                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }
})();

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

// call need scripts
countDown.init();
//timer.init();
toggler.init();
//dateChanger.init();
//tabs.init()
smooth.init();
//momentsJs.init()

// if (window.screen.width > 1024) {
//     parralax.init();
//     bubbles.init();
// }


window.addEventListener('load', function(){
    let loc = document.getElementById("3140935fe475d87b6db");
    loc.value = window.location.href;
    let ref = document.getElementById("3140935fe475d87b6dbref");
    ref.value = document.referrer;
    
    let statUrl = "https://school.marketinator.org/stat/counter?ref=" + encodeURIComponent(document.referrer)
        + "&loc=" + encodeURIComponent(document.location.href);
    document.getElementById('gccounterImgContainer').innerHTML
        = "<img width=1 height=1 style='display:none' id='gccounterImg' src='" + statUrl + "'/>";
});

// outline debugger

[].forEach.call($$("*"), function(a) {
    a.style.outline =
      "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});