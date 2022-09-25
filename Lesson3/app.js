const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback){
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
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}


class GoodsItem{
    constructor(product_name = "Нет названия", price = "Нет цены") {
        this.product_name = product_name;
        this.price = price;
    }

    render() {
        return `<div class="col-4"><div class="card"><div class="card-body">
<h5 class="card-title">${this.product_name}</h5><p class="card-text">${this.price} ${isNaN(this.price) ? "" : " руб"}</p></div></div></div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        // this.goods = [
        //     {product_name: 'Shirt', price: 150},
        //     {product_name: 'Socks', price: 50},
        //     {product_name: 'Jacket', price: 350},
        //     {product_name: 'Shoes', price: 250},
        //     {product_name: 'Shoes-2'},
        //     {price: 52},
        // ]
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb()
        })

    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml
    }
    getCommonPrice() {
        return this.goods.reduce((finalCost, {price}) => finalCost += price || 0, 0)
    }
}

class goodInCart{
    constructor(good) {
        this.productObj = good
        this.amount = 1
    }
}

class Cart {
    constructor() {
        this.cartList = []
    }

    countBasketPrice() {
        return this.cartList.reduce((finalCost, {amount, productObj}) => finalCost += productObj.price * amount, 0)
    }

    addToBasket(good) {
        const prodInCart = this.cartList.find(el => el.productObj === good)
        if (prodInCart) {
            prodInCart.amount++
        } else {
            this.cartList.push(new goodInCart(good))
        }
    }

    renderCart() {
        document.querySelector(".cart").innerText = (this.cartList.length) ?
            `В корзине: ${this.cartList.reduce((amount,good)=>amount+=good.amount,0)} товаров на сумму  ${this.countBasketPrice()} рублей` :
            'Корзина пуста'
    }
}


const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    cart.addToBasket(list.goods[0])
    cart.addToBasket( list.goods[1])
    cart.addToBasket( list.goods[1])
    cart.renderCart()

});

const cart = new Cart();

