Vue.filter('numberFormat', function(value) {
        value = Number(value);
        return (value).toFixed(0).replace(/\d(?=(\d{3}))/g, '$& ');
});

Vue.component('card-item', {
    props: ['card'],
    template:
        `<li class="cards__item"> 
            <img class="card__image"  v-bind:src=card.img> 
            <div class="card__feature" v-if="card.isHot">
                <svg class="card__hot-svg" width="14" height="14">
                        <use xlink:href="#hot"></use>
                </svg>
            </div>
            <div class="card__hit" v-else-if="card.isHit">хит</div>
            <div class="card__veg" v-else-if="card.isVeg">veg</div>
            <div class="card__item-wrapper">
                <h3 class="card__title">{{card.title}}</h3> 
                <span v-if="card.quantity" class="card__quantity">{{card.quantity}}</span> 
                <span class="card__weight">{{card.weight}}</span>
                <span class="card__calories">{{card.calories}} Kkal</span>
                <div v-if="card.additionals" class="card__addition">
                    <div class="card__addition-first">
                        <p class="card__text">Добавить: </p>
                        <div class="card__add">+0<span class="card__add-delete">x</span></div>
                    </div>
                    <div class="card__addition-second"> 
                        <span class="card__add-price">0 <span class="card__add--up"> руб.</span></span>
                        <span class="card__add-plus">+</span>
                    </div>
                </div>
                <form v-if="card.additionals">
                    <select name="select" class="card__select">
                        <option v-for="(additional, key) in card.additionals"
                            v-bind:key="key" value="s1">{{additional.name}}</option>
                    </select>
                </form>
                <div class="card__price-wrapper">
                    <p class="card__price">{{card.price | numberFormat}}<span class="card__price--up"> руб.</span></p>
                    <div class="card__quantity-wrapper">
                        <span class="card__minus" v-on:click="decrementOne(card)">-</span>
                        <input type="number" class="card__buy" v-model="card.readyForCart">
                        <span class="card__plus" v-on:click="incrementOne(card)">+</span>
                    </div>    
                </div>
                <button class="card__button" type="button" @click="function(e) {e.target.classList.add('added');$emit('adding-to-cart', card)}">В корзину</button>
            </div>    
        </li>`,
    methods: {
        incrementOne: function(item) {
            if(item.readyForCart < 10) {
                item.readyForCart++
            }
        },
        decrementOne: function(item) {
            if(item.readyForCart > 1) {
                item.readyForCart--
            }
        }
    }
});

Vue.component('review-item', {
    props: ['review'],
    template:
        `<li class="reviews__item">
                <div class="reviews__items-top">
                    <img class="reviews__image"  v-bind:src=review.img width="67" height="67">
                    <div class="reviews__info">
                        <p class="reviews__name">{{review.name}}</p>
                        <span class="reviews__time">{{review.time}}</span>
                    </div>
                </div>
                <p class="reviews__text">{{review.text}}</p>
                <img class="reviews__picture" v-bind:src=review.descriptionImg width="106" height="142" alt="Фото заказа для клиента">
                <hr class="reviews__hr">
                <svg class="reviews__like" width="14" height="14">
                    <use xlink:href="#like"></use>
                </svg>
                <svg class="reviews__comment" width="14" height="14">
                    <use xlink:href="#comment"></use>
                </svg>
                <svg class="reviews__repost" width="14" height="14">
                    <use xlink:href="#repost"></use>
                </svg>
                <button class="reviews__button" type="button">
                    <svg class="reviews__vk" width="15" height="10">
                        <use xlink:href="#vk"></use>
                    </svg>
                    Подписаться
                </button>
        </li>`
});

Vue.component('cart-item', {
    props: ['cart'],
    template:
        `<li class="cart__item">
                <div class="cart__wrap">
                    <img class="cart__image" v-bind:src=cart.img width="46" height="44">
                    <h3 class="cart__title">{{cart.title}}</h3>
                </div>
                <p class="cart__price">{{fullItemPrice | numberFormat}}<span class="card__price--up"> руб.</span></p>
                <div class="cart__quantity-wrapper">
                        <span class="cart__minus" v-on:click="$emit('decrementing', cart)">-</span>
                        <input type="number" class="cart__quantity " v-model="cart.inCartQuantity">
                        <span class="cart__plus" v-on:click="$emit('incrementing', cart)">+</span>
                </div>
         </li>`,
    computed: {
        fullItemPrice: function() {
            return this.cart.price * this.cart.inCartQuantity;
        }
    }
});

var cards = new Vue({
    el: '#cards',
    data: {
        setItems: [
            {
                img: 'img/set-item-1.jpg',
                title: 'Сет №10',
                quantity: '72 шт',
                weight: '1560 г.',
                calories: 1700,
                price: 2050,
                readyForCart: 1,
                isHit: true
            },
            {
                img: 'img/set-item-2.jpg',
                title: 'Сет №8',
                quantity: '24 шт',
                weight: '960 г.',
                calories: 800,
                price: 1550,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/set-item-3.jpg',
                title: 'Минисет №5',
                quantity: '14 шт',
                weight: '450 г.',
                calories: 400,
                price: 510,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/set-item-4.jpg',
                title: 'Минисет №6',
                quantity: '16 шт',
                weight: '460 г.',
                calories: 490,
                price: 400,
                readyForCart: 1,
                isVeg: true
            },
            {
                img: 'img/set-item-5.jpg',
                title: 'Сет №1',
                quantity: '42 шт',
                weight: '780 г.',
                calories: 1200,
                price: 850,
                readyForCart: 1,
                isHit: true
            },
            {
                img: 'img/set-item-6.jpg',
                title: 'Сет №4',
                quantity: '24 шт',
                weight: '960 г.',
                calories: 670,
                price: 950,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/set-item-7.jpg',
                title: 'Минисет №11',
                quantity: '8 шт',
                weight: '480 г.',
                calories: 320,
                price: 510,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/set-item-8.jpg',
                title: 'Cет №2',
                quantity: '54 шт',
                weight: '2100 г.',
                calories: 1900,
                price: 2400,
                readyForCart: 1,
                isHit: true
            },
            {
                img: 'img/set-item-9.jpg',
                title: 'Минисет №7',
                quantity: '16 шт',
                weight: '580 г.',
                calories: 700,
                price: 900,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/set-item-10.jpg',
                title: 'Cет №9',
                quantity: '40 шт',
                weight: '1304 г.',
                calories: 1050,
                price: 1650,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/set-item-11.jpg',
                title: 'Cет №3',
                quantity: '22 шт',
                weight: '870 г.',
                calories: 990,
                price: 1200,
                readyForCart: 1,
                isVeg: true
            },
            {
                img: 'img/set-item-12.jpg',
                title: 'Cет №12',
                quantity: '24 шт',
                weight: '988 г.',
                calories: 1100,
                price: 980,
                readyForCart: 1
            }
        ],
        rollsItems: [
            {
                img: 'img/rolls-item-1.jpg',
                title: 'Кунсей батакон',
                quantity: '8 шт',
                weight: '250 г.',
                calories: 350,
                price: 260,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/rolls-item-2.jpg',
                title: 'Унаги диру',
                quantity: '8 шт',
                weight: '960 г.',
                calories: 800,
                price: 280,
                readyForCart: 1,
                isHot: true
            },
            {
                img: 'img/rolls-item-3.jpg',
                title: 'Филадельфия',
                quantity: '8 шт',
                weight: '450 г.',
                calories: 400,
                price: 280,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/rolls-item-4.jpg',
                title: 'Мексиканский',
                quantity: '8 шт',
                weight: '460 г.',
                calories: 490,
                price: 290,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/rolls-item-5.jpg',
                title: 'Бангало',
                quantity: '8 шт',
                weight: '267 г.',
                calories: 390,
                price: 320,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/rolls-item-6.jpg',
                title: 'Лиана',
                quantity: '8 шт',
                weight: '275 г.',
                calories: 261,
                price: 450,
                readyForCart: 1
            },
            {
                img: 'img/rolls-item-7.jpg',
                title: 'Канада',
                quantity: '8 шт',
                weight: '270 г.',
                calories: 290,
                price: 420,
                readyForCart: 1,
                isAction: true,
                isHit: true,
                isNew: true
            },
            {
                img: 'img/rolls-item-8.jpg',
                title: 'Коррал',
                quantity: '8 шт',
                weight: '290 г.',
                calories: 350,
                price: 470,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/rolls-item-9.jpg',
                title: 'Будда',
                quantity: '8 шт',
                weight: '280 г.',
                calories: 240,
                price: 240,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/rolls-item-10.jpg',
                title: 'Филадельфия Лайт',
                quantity: '8 шт',
                weight: '254 г.',
                calories: 345,
                price: 290,
                readyForCart: 1
            },
            {
                img: 'img/rolls-item-11.jpg',
                title: 'Калифорния',
                quantity: '8 шт',
                weight: '290 г.',
                calories: 320,
                price: 470,
                readyForCart: 1,
                isAction: true,
                isHot: true
            },
            {
                img: 'img/rolls-item-12.jpg',
                title: 'Волна',
                quantity: '8 шт',
                weight: '258 г.',
                calories: 280,
                price: 230,
                readyForCart: 1,
                isAction: true
            }
        ],
        pizzaItems: [
            {
                img: 'img/pizza-item-1.jpg',
                title: 'Баварская',
                quantity: '33 см',
                weight: '680 г.',
                calories: 1350,
                readyForCart: 1,
                price: 480
            },
            {
                img: 'img/pizza-item-2.jpg',
                title: 'Вегетарианская',
                quantity: '33 см',
                weight: '755 г.',
                calories: 1800,
                price: 380,
                isNew: true,
                readyForCart: 1,
                isVeg: true
            },
            {
                img: 'img/pizza-item-3.jpg',
                title: 'Пепперони',
                quantity: '33 см',
                weight: '615 г.',
                calories: 1400,
                price: 450,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/pizza-item-4.jpg',
                title: 'Классическая',
                quantity: '33 см',
                weight: '590 г.',
                calories: 1490,
                price: 390,
                readyForCart: 1
            },
            {
                img: 'img/pizza-item-5.jpg',
                title: 'Аляска',
                quantity: '33 см',
                weight: '850 г.',
                calories: 1850,
                readyForCart: 1,
                price: 540
            },
            {
                img: 'img/pizza-item-6.jpg',
                title: 'Бавария',
                quantity: '33 см',
                weight: '690 г.',
                calories: 1080,
                price: 520,
                isNew: true,
                readyForCart: 1
            },
            {
                img: 'img/pizza-item-7.jpg',
                title: 'Барбекю',
                quantity: '33 см',
                weight: '870 г.',
                calories: 860,
                price: 590,
                readyForCart: 1,
                isAction: true,
                isHot: true
            },
            {
                img: 'img/pizza-item-8.jpg',
                title: 'Куриный жульен',
                quantity: '33 см',
                weight: '980 г.',
                calories: 1280,
                price: 520,
                readyForCart: 1,
                isNew: true
            },
            {
                img: 'img/pizza-item-9.jpg',
                title: 'Даллас',
                quantity: '33 см',
                weight: '800 г.',
                calories: 1550,
                readyForCart: 1,
                price: 620
            },
            {
                img: 'img/pizza-item-10.jpg',
                title: 'Лос-Анджелес',
                quantity: '33 см',
                weight: '600 г.',
                calories: 1350,
                price: 590,
                readyForCart: 1
            },
            {
                img: 'img/pizza-item-11.jpg',
                title: 'Болоньезе',
                quantity: '33 см',
                weight: '945 г.',
                calories: 1600,
                price: 650,
                readyForCart: 1,
                isAction: true
            },
            {
                img: 'img/pizza-item-12.jpg',
                title: 'Креветка и лосось',
                quantity: '33 см',
                weight: '450 г.',
                calories: 800,
                price: 600,
                readyForCart: 1,
                isNew: true
            }
        ],
        wokItems: [
            {
                img: 'img/wok-item-1.jpg',
                title: 'С говядиной',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ]
            },
            {
                img: 'img/wok-item-2.jpg',
                title: 'С курицей',
                weight: '400 г.',
                calories: 1350,
                price: 290,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ]
            },
            {
                img: 'img/wok-item-3.jpg',
                title: 'С овощами',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ],
                isVeg: true
            },
            {
                img: 'img/wok-item-4.jpg',
                title: 'С овощами',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ]
            },
            {
                img: 'img/wok-item-5.jpg',
                title: 'Тяхан',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ]
            },
            {
                img: 'img/wok-item-6.jpg',
                title: 'Соба',
                weight: '400 г.',
                calories: 1350,
                price: 290,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ],
                isHit: true
            },
            {
                img: 'img/wok-item-7.jpg',
                title: 'Удон',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ]
            },
            {
                img: 'img/wok-item-8.jpg',
                title: 'Рамен',
                weight: '400 г.',
                calories: 1350,
                price: 430,
                readyForCart: 1,
                additionals: [
                    {
                        name: 'Китайский соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Кисло-сладкий соус',
                        price: 10,
                        quantity: 0
                    },
                    {
                        name: 'Терияки соус',
                        price: 15,
                        quantity: 0
                    }
                ],
                isVeg: true
            }
        ],
        reviewItems: [
            {
                id:1,
                img: 'img/reviews-1.jpg',
                name: 'Надежда Наширбанова',
                time: '5 августа 2019 в 9:58',
                text: 'Спасибо за быструю доставку! Отличный поздний ужин после тяжелого дня)',
                descriptionImg: 'img/reviews-picture-1.jpg',
            },
            {
                id:2,
                img: 'img/reviews-2.jpg',
                name: 'Наталья Яковская',
                time: '5 августа 2019 в 9:58',
                text: 'Пицца была очень вкусная, wok и роллы - просто вкусные. Привезли быстро.',
                descriptionImg: 'img/reviews-picture-2.jpg',
            },
            {
                id:3,
                img: 'img/reviews-3.jpg',
                name: 'Александра Холодная',
                time: '5 августа 2019 в 9:58',
                text: 'Отличная доствка, все очень вкусно. Спасибо, будем заказывать еще не один раз.',
                descriptionImg: 'img/reviews-picture-3.jpg',
            }
        ],
        cartItems: [

        ]
    },
    methods: {
        addToCart: function(item){
            for (var i = 0; i < this.cartItems.length; i++) {
                if(this.cartItems[i].title == item.title) {
                    var newQuantity = this.cartItems[i].inCartQuantity + item.readyForCart;
                    this.$set(this.cartItems[i], 'inCartQuantity', newQuantity);
                    return;
                }
            }
            var obj = Object.assign({}, item);
            obj.inCartQuantity = item.readyForCart;
            this.cartItems.push(obj);
            this.totalCartItems;

        },
        incrementCartItem: function(item) {
            if(item.inCartQuantity < 10) {
                item.inCartQuantity++
            }
        },
        decrementCartItem: function(item) {
            if(item.inCartQuantity > 1) {
                item.inCartQuantity--
            } else {
                for (var i = 0; i < this.cartItems.length; i++) {
                    if(this.cartItems[i].title == item.title) {
                        this.cartItems.splice(i, 1);
                        this.totalCartItems;
                        return;
                    }
                }
            }
        },
        activeReviewsButton: function() {

        }
    },
    computed: {
        news: function() {
            var news = [];
            news = news.concat(this.setItems.filter(function(element) {
                return (element.hasOwnProperty('isNew') && element.isNew);
            }));
            news = news.concat(this.rollsItems.filter(function(element) {
                return (element.hasOwnProperty('isNew') && element.isNew);
            }));
            news = news.concat(this.pizzaItems.filter(function(element) {
                return (element.hasOwnProperty('isNew') && element.isNew);
            }));
            news = news.concat(this.wokItems.filter(function(element) {
                return (element.hasOwnProperty('isNew') && element.isNew);
            }));
            return news;
        },
        action: function() {
            var action = [];
            action = action.concat(this.setItems.filter(function(element) {
                return (element.hasOwnProperty('isAction') && element.isAction);
            }));
            action = action.concat(this.rollsItems.filter(function(element) {
                return (element.hasOwnProperty('isAction') && element.isAction);
            }));
            action = action.concat(this.pizzaItems.filter(function(element) {
                return (element.hasOwnProperty('isAction') && element.isAction);
            }));
            action = action.concat(this.wokItems.filter(function(element) {
                return (element.hasOwnProperty('isAction') && element.isAction);
            }));
            return action;
        },
        totalCartItems: function() {
            var itemNames = document.getElementsByClassName('logo__basket--full');
            if(this.cartItems.length == 0) {
                for (var i = 0; i < itemNames.length; i++) {
                    itemNames[i].style.display = 'none';
                }
            } else {
                for (var i = 0; i < itemNames.length; i++) {
                    itemNames[i].style.display = 'block';
                    itemNames[i].textContent = this.cartItems.length;
                }
            }
        },
        totalPrice: function() {
            var sum = 0;
            for (var i = 0; i < this.cartItems.length; i++) {
                sum += this.cartItems[i].price * this.cartItems[i].inCartQuantity;
            }
            return sum;
        }
    },
    mounted: function()  {
        var that = this;
        Vue.nextTick(function () {
            $('.set-slider').slick(slickCardsOptions);
            $('.rolls-slider').slick(slickCardsOptions);
            $('.pizza-slider').slick(slickCardsOptions);
            $('.wok-slider').slick(slickCardsOptions);
            $('.news-slider').slick(slickCardsOptions);
            var likeButton = document.querySelectorAll('.reviews__like');
            var commentButton = document.querySelectorAll('.reviews__comment');
            var repostButton = document.querySelectorAll('.reviews__repost');

            for (var i = 0; i < likeButton.length; i++) {
                likeButton[i].addEventListener("click", function() {
                    this.classList.toggle('active');
                })
            }

            for (var i = 0; i < commentButton.length; i++) {
                commentButton[i].addEventListener("click", function() {
                    this.classList.toggle('active');
                })
            }

            for (var i = 0; i < repostButton.length; i++) {
                repostButton[i].addEventListener("click", function() {
                    this.classList.toggle('active');
                })
            }

            var popupWrap = document.querySelector('.popup__wrap');
            var popup = document.querySelector('.popup-cart');
            var openButtons = document.querySelectorAll('.open__popup');
            var buttonPopup = document.querySelector('.cart__close');


            for (var i = 0; i <openButtons.length; i++) {
                openButtons[i].addEventListener("click", function(){
                    popup.classList.add('popup__open');
                    popupWrap.classList.add('popup__open');
                });
            }

            buttonPopup.addEventListener("click", function(){
                popup.classList.remove('popup__open');
                popupWrap.classList.remove('popup__open');
            });

            popupWrap.addEventListener("click", function(){
                popup.classList.remove('popup__open');
                popupWrap.classList.remove('popup__open');
            });


            var cabinetWrap = document.querySelector('.popup-cabinet__wrap');
            var cabinet = document.querySelector('.popup-cabinet');
            var cabinetButtons = document.querySelectorAll('.open__cabinet');
            var buttonCabinet = document.querySelector('.cabinet__close');

            for (var i = 0; i <cabinetButtons.length; i++) {
                cabinetButtons[i].addEventListener("click", function(){
                    cabinet.classList.add('popup__open');
                    cabinetWrap.classList.add('popup__open');
                });
            }

            buttonCabinet.addEventListener("click", function(){
                cabinet.classList.remove('popup__open');
                cabinetWrap.classList.remove('popup__open');
            });

            cabinetWrap.addEventListener("click", function(){
                cabinet.classList.remove('popup__open');
                cabinetWrap.classList.remove('popup__open');
            });

            var infoWrap = document.querySelector('.popup-info__wrap');
            var info = document.querySelector('.popup-info');
            var cartButton = document.querySelector('.cart__button');
            var infoClose = document.querySelector('.info__close');


            cartButton.addEventListener("click", function(){
                popup.classList.remove('popup__open');
                popupWrap.classList.remove('popup__open');
                info.classList.add('popup__open');
                infoWrap.classList.add('popup__open');
            });

            infoClose.addEventListener("click", function(){
                info.classList.remove('popup__open');
                infoWrap.classList.remove('popup__open');
            });

            infoWrap.addEventListener("click", function(){
                info.classList.remove('popup__open');
                infoWrap.classList.remove('popup__open');
            });

            var thankWrap = document.querySelector('.popup-thank__wrap');
            var thank = document.querySelector('.popup-thank');
            var infoForm = document.querySelector('.info__form');
            var feedbackForm = document.querySelector('.feedback__form');
            var cabinetForm = document.querySelector('.cabinet__form');
            var thankClose = document.querySelector('.thank__close');

            infoForm.addEventListener("submit", function(e){
                if(!e) e = window.event;


                e.preventDefault();
                e.stopPropagation();
                info.classList.remove('popup__open');
                infoWrap.classList.remove('popup__open');
                thank.classList.add('popup__open');
                thankWrap.classList.add('popup__open');
                infoForm.reset();
                that.cartItems = [];
                that.totalCartItems;
            });

            feedbackForm.addEventListener("submit", function(e){
                if(!e) e = window.event;

                e.preventDefault();
                e.stopPropagation();
                thank.classList.add('popup__open');
                thankWrap.classList.add('popup__open');
                feedbackForm.reset();
            });

            cabinetForm.addEventListener("submit", function(e){
                if(!e) e = window.event;

                e.preventDefault();
                e.stopPropagation();
                cabinet.classList.remove('popup__open');
                cabinetWrap.classList.remove('popup__open');
                thank.classList.add('popup__open');
                thankWrap.classList.add('popup__open');
                cabinetForm.reset();
            });

            thankClose.addEventListener("click", function(){
                thank.classList.remove('popup__open');
                thankWrap.classList.remove('popup__open');
            });

            thankWrap.addEventListener("click", function(){
                thank.classList.remove('popup__open');
                thankWrap.classList.remove('popup__open');
            });

            that.totalCartItems;

        });


    }
});
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