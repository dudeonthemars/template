window.addEventListener('load', function(){
    Grade(document.querySelectorAll('.gradient-wrap'))
})

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
    $("body").on("click", "a.btn, a.animate, .btn-liquid, a.smooth", function() {
        var idtop = $($(this).attr("href")).offset().top;
        $('html,body').animate({
            scrollTop: idtop
        }, 600);
        return false;
    });
});

// form fields
function checkform(f) {
    var line = document.getElementsByClassName('.some-form__line');
    var errMSG = "";
    // цикл ниже перебирает все элементы в объекте f, 
    // переданном в качестве параметра
    // функции, в данном случае - наша форма.            
    for (var i = 0; i < f.elements.length; i++)
    // если текущий элемент имеет атрибут required
    // т.е. обязательный для заполнения
        if (null != f.elements[i].getAttribute("required"))
        // проверяем, заполнен ли он в форме
            if (isEmpty(f.elements[i].value)) // пустой
                errMSG += "  " + f.elements[i].name + "\n"; // формируем сообщение
            // об ошибке, перечисляя 
            // незаполненные поля
            // если сообщение об ошибке не пусто,
            // выводим его, и возвращаем false     
    if ("" != errMSG) {
        alert("Не заполнены обязательные поля:\n" + errMSG);
        return false;
    }

    function isEmpty(str) {
        for (var i = 0; i < str.length; i++)
            if (" " != str.charAt(i))
                return false;
        return true;
    }

}

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
// call need scripts
//countDown.init();
//timer.init();
//toggler.init();
//dateChanger.init();