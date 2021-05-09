$(document).ready(function() {

    wow = new WOW({
        boxClass: 'wow', // default
        offset: 200, // default
        mobile: false, // default
        live: true // default
    });

    wow.init();

    //$(window).stellar();

    //text-rotator
    // $(".rotate").textrotator({
    //     animation: "dissolve", //  Options dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
    //     separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
    //     speed: 2000 // How many milliseconds until the next word show.
    // });

    //slick
    $('.recomendations').slick({
        draggable: true,
        infinite: true,
        dots: true,
        autoplay: false,
        speed: 900,
        cssEase: 'ease-in-out',
        lazyLoad: 'ondemand',
        arrows: false,
        slidesToShow: 3,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    infinite: true,

                }
            },
            {
                breakpoint: 760,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                }
            }

        ]
    });

    //readmore

    $('.testimonials p').readmore({
        speed: 300,
        moreLink: '<a href="#" class="link">Читать полностью</a>',
        lessLink: '<a href="#" class="link">Закрыть</a>',
        collapsedHeight: 220
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
            let section = document.querySelector('#content2')
            let tabButton = document.querySelectorAll('.modules__btn');
            let tabContent = document.querySelectorAll('.modules__content');
            let parent = document.querySelector('.modules__tabs');
            let modulesSpan = document.querySelectorAll('.modules__span');
            let form1 = document.querySelector('#form1')
            let insertedContent1 = document.querySelector(".inserted-form1");
            let insertedContent2 = document.querySelector(".inserted-form2");
            let form2 = document.querySelector('#form2')
            let tabContentList = [];
            let tabButtonsList = [];
            let modulesSpanList = [];
            let ourClick;

            for (i = 0; i < tabButton.length; i++) {
                tabButton[i].setAttribute('data-index', [i]);
                tabContent[i].setAttribute('data-index', [i]);
                modulesSpan[i].setAttribute('data-index', [i]);
                tabContentList.push(tabContent[i]);
                tabButtonsList.push(tabButton[i]);
                modulesSpanList.push(modulesSpan[i]);
            }

            parent.addEventListener('click', (event) => {
                ourClick = event.target;
                if (ourClick == tabButtonsList[ourClick.dataset.index]) {
                    removeActive()
                    removeBg()
                    tabContentList[ourClick.dataset.index].classList.add('is-active');
                    tabContentList[ourClick.dataset.index].setAttribute('aria-expanded', 'true');
                    tabButtonsList[ourClick.dataset.index].classList.add('is-active');
                    tabButtonsList[ourClick.dataset.index].setAttribute('aria-expanded', 'true');
                    modulesSpanList[ourClick.dataset.index].classList.add('is-active');
                    addBg()
                    $('.recomendations').slick('refresh')
                }

                if (ourClick.classList.contains('switch1')) {
                    switchOne()
                    
                }

                if (ourClick.classList.contains('switch2')) {
                    switchTwo()
                }

                if (ourClick.classList.contains('switch3')) {
                    switchThree()
                }
            });

            // switch1.addEventListener('click', switchOne)
            // switch3.addEventListener('click', switchThree)

            function switchOne() {
                removeActive()
                removeBg()
                tabButtonsList[0].classList.add('is-active');
                tabButtonsList[0].setAttribute('aria-expanded', 'true');
                tabContentList[0].classList.add('is-active');
                tabContentList[0].setAttribute('aria-expanded', 'true');
                section.classList.add('bg1');
                $('.recomendations').slick('refresh');
                console.log('remove1')
                
            }

            function switchTwo() {
                removeActive()
                removeBg()
                tabButtonsList[1].classList.add('is-active');
                tabButtonsList[1].setAttribute('aria-expanded', 'true');
                tabContentList[1].classList.add('is-active');
                tabContentList[1].setAttribute('aria-expanded', 'true');
                section.classList.add('bg2');
                $('.recomendations').slick('refresh');
                console.log('remove 2')
            }

            function switchThree() {
                removeActive()
                removeBg()
                tabButtonsList[2].classList.add('is-active');
                tabButtonsList[2].setAttribute('aria-expanded', 'true');
                tabContentList[2].classList.add('is-active');
                tabContentList[2].setAttribute('aria-expanded', 'true');
                section.classList.add('bg3');
                $('.recomendations').slick('refresh');
            }

            function removeBg() {
                section.removeAttribute('class')
            }

            function addBg() {
                let condition = ourClick.classList.contains('is-active') && tabContent[ourClick.dataset.index].getAttribute('aria-labelledby');

                switch (condition) {
                    case "content-1": 
                        section.classList.add('bg1');
                        break
                    case "content-3": 
                        section.classList.add('bg3');
                        break
                    default:
                        section.classList.add('bg2');
                }
            }

            function removeActive() {
                for (x = 0; x < tabContentList.length; x++) {
                    tabContentList[x].classList.remove('is-active');
                    tabContentList[x].setAttribute('aria-expanded', 'false');
                    tabButtonsList[x].classList.remove('is-active');
                    tabButtonsList[x].setAttribute('aria-expanded', 'false');
                    modulesSpanList[x].classList.remove('is-active');
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

function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});

ityped.init(document.querySelector("#ityped"), {
    showCursor: false,
    strings: ['создать', 'настроить', 'заработать']
})

var cart = [];
    if ($.cookie('cart') != null) {
        cart = JSON.parse($.cookie('cart'));
        reindexCartItems(cart);
    }
    $('.cart').on('click', function() {
        $(this).removeClass('incart');
        $(this).addClass('incart');
        var product = $(this).closest('li');
        var id = product.attr('id');
        if (cart.indexOf(id) === -1) {
            cart.push(id);
        }
        reindexCartItems(cart);
        $('.modal').modal('show');
    });
    $(document).on('click', '.cfield', function() {
       $(this).removeClass('error-empty');
    });
    $(document).on('click', '.cart-item-remove', function() {
        var id = $(this).attr('data-id');
        $('#'+id).find('.cart').removeClass('incart');
        var removeElement = cart.indexOf(id);
        cart.splice(removeElement, 1);
        reindexCartItems(cart);
    });
    $(document).on('click', '#place-order', function() {
        var name = $('#name');
        var email = $('#email');
        var phone = $('#phone');
        name.removeClass('error-empty');
        email.removeClass('error-empty');
        phone.removeClass('error-empty');

        cart.forEach(function(id, i, cart) {
            var product = $('#'+id);
            var title = product.find('a').html();
            var priceElement = product.find('.ruble').clone();
            priceElement.find('span').remove();
            var priceString = priceElement.text();
            var trimedPrice = priceString.replace(/\s+/g, '');
            var price = parseInt(trimedPrice);
        });
        if (name.val() !== '' && email.val() !== '' && phone.val() !== '') {
            $('#order-form').submit();
            $.removeCookie('cart');
            cart = [];
            reindexCartItems(cart);
        } else {
            if (name.val() === '') {
                name.parent('.cfield').addClass('error-empty');
            }
            if (email.val() === '') {
                email.parent('.cfield').addClass('error-empty');
            }
            if (phone.val() === '') {
                phone.parent('.cfield').addClass('error-empty');
            }
        }
    });
    function reindexCartItems(cart) {
        $.cookie('cart', JSON.stringify(cart));
        var html = '';
        var total = 0;
        cart.forEach(function(id, i, cart) {
            var product = $('#'+id);
            var title = product.find('a').html();
            var priceElement = product.find('.ruble').clone();
            priceElement.find('span').remove();
            var priceString = priceElement.text();
            var trimedPrice = priceString.replace(/\s+/g, '');
            var price = parseInt(trimedPrice);            
            total = total + price;           
            html += '<div class="cart-item">';
            html += '<span class="cart-item-title">'+title+'</span>';
            html += '<span class="cart-item-price">'+price+' руб.</span>';
            html += '<span data-id="'+id+'" class="cart-item-remove">x</span>';
            html += '</div>';
            html += '<div class="clear"></div>';
            html += '<input type="hidden" name="tovar_id[]" value="'+id+'">';
        });
        if (cart.length > 0) {
            html += '<div class="title text-center h-padding-top-32 h-padding-bottom-32"><span class="c-blue">Итого:</span> <b>' + total + ' руб / ' + parseInt(total / 65) + '$ </b></div>';
            html += '<div class="text-center"><div class="accordion"><ul><li><div class="msg">';
            html += '<label for="payment" class="label">Способ оплаты </label>';
            html += '<select id="payment" class="cfield ph h-margin-bottom-32" name="pay_mode">';
            html += '<option value="4" selected="">Российские карты и Вебмани</option>';
            html += '<option value="13" >Интеркасса (ОПЛАТА КАРТОЙ)</option>';
            html += '<option value="16">PayPal</option>';
            
            html += '</select>';
            html += '<div class="text-center h-margin-top-42 h-margin-bottom-24 cfield"><input class="ph" id="name" name="name" type="text" placeholder="Ваше имя" required="required"></div>';
            html += '<div class="text-center h-margin-top-42 h-margin-bottom-24 cfield"><input class="ph" id="email" name="email" type="text" placeholder="Ваш e-mail" required="required"></div>';
            html += '<div class="text-center h-margin-top-42 h-margin-bottom-24 cfield"><input class="ph" id="phone" name="phone" type="text" placeholder="Ваш телефон" required="required"></div>';
            html += '<button id="place-order" type="button" class="btn btn_blue">Заказать</button>';
            html += '<div class="h-margin-top-24"></div></li></ul></div>';
            html += '<button id="continue" type="button" class="btn btn_blue" data-dismiss="modal">Продолжить покупки</button>';
        }
        $('#cart-items').html(html);
    }
// call need scripts

tabs.init()
smooth.init();
