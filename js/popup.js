var popupWrap = document.querySelector('.popup__wrap');
var popup = document.querySelector('.popup-cart');
var openButtons = document.querySelector('.open__popup');
var buttonPopup = document.querySelector('.cart__close');

openButtons.addEventListener("click", function(){
    popup.classList.add('popup__open');
    popupWrap.classList.add('popup__open');
});

buttonPopup.addEventListener("click", function(){
    popup.classList.remove('popup__open');
    popupWrap.classList.remove('popup__open');
});