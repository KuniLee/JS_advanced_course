const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class goodInCart {
    constructor(good) {
        this.productObj = good
        this.amount = 1
    }
}

const {createApp} = Vue
createApp({
    data() {
        return {
            searchLine:'',
            isVisibleCart: false,
            goods: [],
            filteredGoods: [],
            basket: []
        }
    },
    methods: {
        makeGETRequest: (url) => new Promise((resolve) => {
            var xhr;
            if (window.XMLHttpRequest) {
                // Chrome, Mozilla, Opera, Safari
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // Internet Explorer
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    resolve(xhr.responseText)
                }
            }
            xhr.open('GET', url, true);
            xhr.send();
        }),
        fetchGoods() {
            return new Promise((resolve) => {
                this.makeGETRequest(`${API_URL}/catalogData.json`).then(
                    (goods) => {
                        this.goods = JSON.parse(goods);
                        this.filteredGoods = JSON.parse(goods);
                        resolve()
                    })
            })
        },
        addToBasket(good) {
            const prodInCart = this.basket.find(el => el.productObj === good)
            if (prodInCart) {
                prodInCart.amount++
            } else {
                this.basket.push(new goodInCart(good))
            }
        },
        removeFromBasket(good) {
            this.basket = this.basket.filter(el => el.productObj !== good)
        },
        countBasketPrice() {
            return this.basket.reduce((finalCost, {amount, productObj}) => finalCost += productObj.price * amount, 0)
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good =>
                regexp.test(good.product_name));
        }
    },
    computed: {
        renderCart() {
            return (this.basket.length) ?
                `В корзине: ${this.basket.reduce((amount, good) => amount += good.amount, 0)} товаров на сумму ${this.countBasketPrice()} рублей` :
                'Корзина пуста'
        },
    },

    mounted() {
        this.fetchGoods()
    }
}).mount('#app')