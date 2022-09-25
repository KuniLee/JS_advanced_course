class GoodsItem {
    constructor(title = "Нет названия", price = "Нет цены") {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="col-4"><div class="card"><div class="card-body">
<h5 class="card-title">${this.title}</h5><p class="card-text">${this.price} ${isNaN(this.price) ? "" : " руб"}</p></div></div></div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            {title: 'Shirt', price: 150},
            {title: 'Socks', price: 50},
            {title: 'Jacket', price: 350},
            {title: 'Shoes', price: 250},
            {title: 'Shoes-2'},
            {price: 52},
        ]
    }

    render() {
        let listHtml = "";
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml
    }
    getCommonPrice() {
        return this.goods.reduce((finalCost, {price}) => finalCost += price || 0, 0)
    }
}

//1.2. Добавлен класс для товара в корзине и самой корзины с методами добавления товара в корзину (addToBasket), подсчёта общей
// стоимости корзины (countBasketPrice) и вывода Информации о корзине (renderCart). В класс GoodList добавлен метод
//getCommonPrice

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
        return this.cartList.length ?
            `В корзине: ${this.cartList.length} товаров на сумму  ${this.countBasketPrice()} рублей` :
            'Корзина пуста'
    }
}


const list = new GoodsList();
list.fetchGoods();
list.render();

const cart = new Cart();
cart.addToBasket(list.goods[0])
cart.addToBasket( list.goods[1])
cart.addToBasket( list.goods[1])

console.log(cart.renderCart())