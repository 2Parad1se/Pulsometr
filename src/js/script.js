
$(document).ready(function(){
    $('.slider__wrapper').slick({
        accessibility: true,
        arrows: true,
        speed: 1500,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/slider_arrow_left.png" alt="arrow"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/slider_arrow_right.png" alt="arrow"></button>',
    });
  });


document.addEventListener('DOMContentLoaded', () => {

    // catalog tabs+item
    const tabs = document.querySelectorAll('.catalog__tab');
    const contents = document.querySelectorAll('.catalog__content');
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => {
                tab.classList.remove('catalog__tab-active');
            })
            contents.forEach(content => {
                content.classList.remove('catalog__content-active');
            })

            tab.classList.add('catalog__tab-active');
            contents[i].classList.add('catalog__content-active');
        })
    })

    const linksMore = document.querySelectorAll('.catalog__link-more');
    const linksBack = document.querySelectorAll('.catalog__link-back');
    const mains = document.querySelectorAll('.catalog__item_main');
    const secondary = document.querySelectorAll('.catalog__item_secondary');


    linksMore.forEach((link, i) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mains[i].classList.remove('catalog__item_main_active');
            secondary[i].classList.add('catalog__item_secondary_active');
            
        })
    })

    linksBack.forEach((link, i) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            secondary[i].classList.remove('catalog__item_secondary_active');
            mains[i].classList.add('catalog__item_main_active');
        })
    })

    // modal
    overlay = document.querySelector('.overlay');
    modalConsultation = document.querySelector('#consultation');
    modalOrder = document.querySelector('#order');
    modalThanks = document.querySelector('#thanks');
    modalsClose = document.querySelectorAll('.modal__close');
    btnsConsultation = document.querySelectorAll('[data-modal=consultation]');
    btnsBuy = document.querySelectorAll('.button_buy');
    catalogTitle = document.querySelectorAll('.catalog__title');
    nameOrder = document.querySelector('.name_order');
    
    btnsConsultation.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showModal(modalConsultation);
        })
    })

    btnsBuy.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            nameOrder.textContent = catalogTitle[i].textContent;
            showModal(modalOrder);
        })
    })

    modalsClose.forEach(modal => {
        modal.addEventListener('click', () => {
            closeModal();
        })
    })

    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay')) {
            closeModal();
        }

    })

    function showModal(elem){
        overlay.classList.remove('hidden');
        elem.classList.remove('hidden');
    }

    function closeModal(){
        modalConsultation.classList.add('hidden');
        modalOrder.classList.add('hidden');
        modalThanks.classList.add('hidden');
        overlay.classList.add('hidden');
    }
    
    // telegram+mail
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: 'servers/telegram.php',
            type: 'POST',
            data: $(this).serialize()
        }).done(function () {
            console.log('Сообщение в телеграмм отправлено');
        });
        $.ajax({
            type: 'POST',
            url: 'servers/mailer/smart.php',
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');
            $('form').trigger('reset');
            closeModal();
            showModal(modalThanks);
        });
        return false;
    })

    //imaskjs
    let elements = document.querySelectorAll('.phone');
       
    for (let i = 0; i < elements.length; i++) {
      new IMask(elements[i], {
        mask: '+{7}(000)000-00-00',
      });
    }

    // wow.js
    new WOW().init();

    //scroll
    const arrowUp = document.querySelector('.pageup');

    window.addEventListener('scroll', () => {
        // console.log(window.scrollY);
       if (window.scrollY > 1200) {
        arrowUp.classList.remove('hidden');
       } else {
           arrowUp.classList.add('hidden');
       }
    })
})