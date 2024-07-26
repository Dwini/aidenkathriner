(function ($) {
    "use strict";

    // Scroll animation init
    window.sr = new scrollReveal();
  
    // Menu Dropdown Toggle
    if ($(".menu-trigger").length) {
        $(".menu-trigger").on("click", function () {
        $(this).toggleClass("active");
        $(".header-area .nav").slideToggle(200);
        });
    }

    // Menu elevator animation
    $("a[href*=\\#]:not([href=\\#])").on("click", function () {
        if (
        location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
        ) {
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
            var width = $(window).width();
            if (width < 767) {
            $(".menu-trigger").removeClass("active");
            $(".header-area .nav").slideUp(200);
            }
            $("html,body").animate(
            {
                scrollTop: target.offset().top - 130,
            },
            700
            );
            return false;
        }
        }
    });

    // Accordion + Plus Minus
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
        });
    }

    $(document).ready(function () {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $("a").each(function () {
            $(this).removeClass("active");
        });
        $(this).addClass("active");

        var target = this.hash,
            menu = target;
        var target = $(this.hash);
        $("html, body")
            .stop()
            .animate(
            {
                scrollTop: target.offset().top - 130,
            },
            500,
            "swing",
            function () {
                window.location.hash = target;
                $(document).on("scroll", onScroll);
            }
            );
        });
    });

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $(".nav a").each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (
            refElement.position().top <= scrollPos &&
            refElement.position().top + refElement.height() > scrollPos
          ) {
            $(".nav ul li a").removeClass("active");
            currLink.addClass("active");
          } else {
            currLink.removeClass("active");
          }
        });
      }

    // Home seperator
    if ($(".home-seperator").length) {
        $(".home-seperator .left-item, .home-seperator .right-item").imgfix();
    }

    // Home number counterup
    if ($(".count-item").length) {
        $(".count-item strong").counterUp({
        delay: 10,
        time: 1000,
        });
    }

    /*==================== ACCORDION EXPERIENCE ====================*/
    const experienceContent = document.getElementsByClassName('experience__content'),
        experienceHeader = document.querySelectorAll('.experience__header')

    function toggleExperience(){
        let itemClass = this.parentNode.className

        for(i = 0; i < experienceContent.length; i++){
            experienceContent[i].className = 'experience__content experience__close'
        }

        if(itemClass === 'experience__content experience__close'){
            this.parentNode.className = 'experience__content experience__open'
        }
    }

    experienceHeader.forEach((el)  =>{
        el.addEventListener('click', toggleExperience)

    })

    /*==================== QUALIFICATION TABS ====================*/
    const tabs = document.querySelectorAll('[data-target]'),
        tabContents = document.querySelectorAll('[data-content]')

    tabs.forEach(tab =>{
        tab.addEventListener('click', () =>{
            const target = document.querySelector(tab.dataset.target)

            tabContents.forEach(tabContent =>{
                tabContent.classList.remove('qualification__active')
            })
            target.classList.add('qualification__active')

            tabs.forEach(tab =>{
                tab.classList.remove('qualification__active')
            })
            tab.classList.add('qualification__active')
        })
    })

    /*==================== SERVICES MODAL ====================*/
    const modalViews = document.querySelectorAll('.projects__modal'),
        modalBtns = document.querySelectorAll('.projects__button'),
        modalCloses = document.querySelectorAll('.projects__modal-close')

    let modal = function(modalClick){
        modalViews[modalClick].classList.add('active-modal')
    }

    modalBtns.forEach((modalBtn, i) => {
        modalBtn.addEventListener('click', () =>{
            modal(i)
        })
    })

    modalCloses.forEach((modalClose) => {
        modalClose.addEventListener('click', () =>{
            modalViews.forEach((modalView) =>{
                modalView.classList.remove('active-modal')
            })
        })
    })

    /*==================== SERVICES MODAL ====================*/
    const testimonialViews = document.querySelectorAll('.testimonial__modal'),
        testimonialBtns = document.querySelectorAll('.testimonial__button'),
        testimonialCloses = document.querySelectorAll('.testimonial__modal-close')

    let testimonial = function(testimonialClick){
        modalViews[testimonialClick].classList.add('active-modal')
    }

    testimonialBtns.forEach((testimonialBtn, i) => {
        testimonialBtn.addEventListener('click', () =>{
            modal(i)
        })
    })

    testimonialCloses.forEach((testimonialClose) => {
        testimonialClose.addEventListener('click', () =>{
            testimonialViews.forEach((testimonialView) =>{
                testimonialView.classList.remove('active-modal')
            })
        })
    })

    /*==================== PORTFOLIO SWIPER  ====================*/
    let swiperProjects = new Swiper('.projects__container', {
        cssMode: true,
        loop: true,
        
        navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        },
        pagination: {
        el: '.swiper-pagination',
        clickable: true,
        },
    });

    /*==================== TESTIMONIAL ====================*/
    let swiperTestimonial = new Swiper('.testimonial__container', {
        cssMode: true,
        loop: true,
        
        navigation: {
        nextEl: '.swiper-button-next-testimonial',
        prevEl: '.swiper-button-prev-testimonial',
        }
    });

    /*==================== SHOW SCROLL UP ====================*/ 
    function scrollUp(){
        const scrollUp = document.getElementById('scroll-up');
        // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
        if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
    }
    window.addEventListener('scroll', scrollUp)

    /*==================== DARK LIGHT THEME ====================*/ 
    const themeButton = document.getElementById('theme-button')
    const darkTheme = 'dark-theme'
    const iconTheme = 'uil-sun'

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem('selected-theme')
    const selectedIcon = localStorage.getItem('selected-icon')

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
    const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

    // We validate if the user previously chose a topic
    if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })

    /*==================== CONTACT FORM VALIDATIONS ====================*/ 
    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var messageError = document.getElementById('message-error');

    function validateName(){
        var name = document.getElementById('fullName').value;

        if(name.length == 0){
            nameError.innerHTML = 'Full name is required!';
            return false;
        }
        if( !name.match(/[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?/) ){
            nameError.innerHTML = 'Enter full name!';
            return false;
        }
        nameError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
        return true;
    }

    function validateEmail(){
        var email = document.getElementById('email_id').value;

        if(email.length == 0){
            emailError.innerHTML = 'A valid email address is required!';
            return false;
        }
        // if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        if(!email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
            emailError.innerHTML = 'Invalid email!';
            return false;
        }
        emailError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
        return true;
    }

    function validateMessage(){
        var message = document.getElementById('message').value;
        var required = 30;
        var left = required - message.length;

        if (left>0){
            messageError.innerHTML = left + ' more characters are required!';
            return false;
        }
        messageError.innerHTML = '<i class="uil uil-check-circle projects__modal-icon"></i>';
        return true;
    }

    /*==================== EMAIL SERVICE ====================*/ 
})(window.jQuery);
