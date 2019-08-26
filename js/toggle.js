var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.logo__toggle');
var logo = document.querySelector('.logo');

navMain.classList.remove('main-nav--opened');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function () {
    if(navMain.classList.contains('main-nav--closed')){
        navMain.classList.remove('main-nav--closed');
        logo.classList.remove('logo--closed');
        logo.classList.add('logo--opened');
    } else {
        navMain.classList.add('main-nav--closed');
        logo.classList.remove('logo--opened');
        logo.classList.add('logo--closed');
    }
});

var linkAdvantages = document.querySelector('.advantages__more'),
    boxAdvantages = document.querySelector('.advantages__list');
linkAdvantages.onclick = function() {
    boxAdvantages.classList.remove("advantages__list--close");
    linkAdvantages.style.display='none';
};

var link = document.querySelector('.about__more'),
    box = document.querySelector('.about__description');
link.onclick = function() {
    box.classList.remove("about__description--close");
    link.style.display='none';
};

//offer
var newsButton = document.querySelector('.filter__news');
var newsList = document.querySelector('.news__list');
var actionButton = document.querySelector('.filter__action');
var actionList = document.querySelector('.action__list');

newsButton.onclick = function () {
    actionList.classList.add('list-hide');
    actionButton.classList.remove('filter__item--active');
    $('.action-slider').slick('unslick');
    newsList.classList.remove('list-hide');
    newsButton.classList.add('filter__item--active');
    $('.news-slider').slick(slickCardsOptions);


};

actionButton.onclick = function () {
    newsList.classList.add('list-hide');
    newsButton.classList.remove('filter__item--active');
    $('.news-slider').slick('unslick');
    actionList.classList.remove('list-hide');
    actionButton.classList.add('filter__item--active');
    $('.action-slider').slick(slickCardsOptions);

};

var slickCardsOptions = {
    slidesToShow: 1,
    slidesToScroll: 1,
    respondTo: 'window',
    rows: 1,
    infinite: true,
    dots: false,
    arrows: false,
    mobileFirst:true,
    responsive: [
        {
            breakpoint: 779,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                rows: 1,
                dots: true,
                arrows: true
            }
        },
        {
            breakpoint: 1279,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                rows: 1,
                dots: true,
                arrows: true
            }
        }
    ]
};
