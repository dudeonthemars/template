$(document).on('ready', function() {

    wow = new WOW({
        boxClass: 'wow', // default
        offset: 200, // default
        mobile: false, // default
        live: true // default
    })
    wow.init();

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
                    $('.counter_value').each(function() {
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

let bubbles = (function(){
    return {
        init: function() {
            function createBubble() {
                const section = document.querySelector('#content2');
                const createElement = document.createElement('span');
                let size = Math.random() * 60;

                createElement.style.width = 20 + size + 'px';
                createElement.style.height = 20 + size + 'px';
                createElement.classList.add('bubble');
                createElement.style.left = Math.random() * innerWidth + 'px';
                section.appendChild(createElement);

                setTimeout(() => {
                    createElement.remove()
                }, 8000);
            }

            setInterval(createBubble, 500);
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
})()

// call need scripts

//countDown.init();
//timer.init();
toggler.init();
//dateChanger.init();
tabs.init()
smooth.init();

if (window.screen.width > 1024) {
    parralax.init();
    bubbles.init();
}
