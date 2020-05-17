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
})

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

toggler.init();