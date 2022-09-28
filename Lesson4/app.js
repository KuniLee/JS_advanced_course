const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const makeGETRequest = (url) => new Promise((resolve) => {
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
})

class GoodsItem {
    constructor(product_name = "Нет названия", price = "Нет цены", id) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id
    }

    render() {
        return `<div class="col-4"><div class="card"><div class="card-body">
<h5 class="card-title">${this.product_name}</h5><p class="card-text">${this.price} ${isNaN(this.price) ? "" : " руб"}</p>
<button data-add="${this.id_product}" class="btn btn-primary">В корзину</button></div></div></div></div>`
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }

    fetchGoods() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`).then(
                (goods) => {
                    this.goods = JSON.parse(goods);
                    this.filteredGoods = JSON.parse(goods);
                    resolve()
                })
        })
    }

    filterGoods(value) {
        const regexp = new RegExp(value,'i');
        this.filteredGoods = this.goods.filter(good =>
            regexp.test(good.product_name));
        this.render();
    }

    render() {
        let listHtml = "";
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml
    }

    getCommonPrice() {
        return this.goods.reduce((finalCost, {price}) => finalCost += price || 0, 0)
    }
}

class goodInCart {
    constructor(good) {
        this.productObj = good
        this.amount = 1
    }
}

class Basket {
    constructor() {
        this.basket = []
    }

    countBasketPrice() {
        return this.basket.reduce((finalCost, {amount, productObj}) => finalCost += productObj.price * amount, 0)
    }

    addToBasket(good) {
        const prodInCart = this.basket.find(el => el.productObj === good)
        if (prodInCart) {
            prodInCart.amount++
        } else {
            this.basket.push(new goodInCart(good))
        }
        this.renderCart()
        this.getCartList()
    }

    removeFromBasket(good) {
        this.basket = this.basket.filter(el => el.productObj !== good)
        this.renderCart()
        this.getCartList()
    }

    getCartList() {
        const cartList = document.querySelector('ul')
        cartList.innerHTML = ''
        if (!this.basket.length) cartList.innerHTML = "Корзина пуста"
        else {
            this.basket.forEach(({productObj, amount}) => {
                cartList.insertAdjacentHTML('beforeend',
                    `<li class="list-group-item position-relative">${productObj.product_name}. ${amount} шт. Сумма: ${amount * productObj.price}руб.
<button data-remove="${productObj.id_product}" class="btn btn-danger position-absolute top-0 end-0">Удалить</button></li>
`)
            })
        }
    }

    renderCart() {
        document.querySelector(".cart").innerText = (this.basket.length) ?
            `В корзине: ${this.basket.reduce((amount, good) => amount += good.amount, 0)} товаров на сумму  ${this.countBasketPrice()} рублей` :
            'Корзина пуста'
    }
}


const list = new GoodsList();
list.fetchGoods().then(() => {
    list.render();
    // cart.addToBasket(list.goods[0])
    // cart.addToBasket(list.goods[1])
    // cart.addToBasket(list.goods[1])
    //cart.removeFromBasket(list.goods[1])
    cart.getCartList()
});

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');
searchButton.addEventListener('click', () =>{
    const value = searchInput.value;
    list.filterGoods(value);
})

const cart = new Basket();

document.addEventListener('click', ({target}) => {
        if (target.dataset.add) {
            cart.addToBasket(list.goods.find(el => el.id_product == target.dataset.add))
        }
        if (target.dataset.remove) {
            cart.removeFromBasket(list.goods.find(el => el.id_product == target.dataset.remove))
        }
    }
)

const form = document.querySelector('.form')
const inputs = form.querySelectorAll("input,textarea")
const name = form.querySelector('#name')
const phone = form.querySelector('#phone')
const email = form.querySelector('#email')
const text = form.querySelector('#text')
let notValidated=new Set( Array.from(inputs).map(input=>input.labels[0].outerText))

function validation(e, regexp) {
    if ( regexp.test(e.target.value)){
        e.target.classList.remove('is-invalid')
        e.target.classList.add('is-valid')
        notValidated.delete(e.target.labels[0].outerText)
    } else {
        e.target.classList.remove('is-valid')
        e.target.classList.add('is-invalid')
        notValidated.add(e.target.labels[0].outerText)
    }
}

name.addEventListener('input',(e)=>{
    validation(e, /^[a-zа-я_-]+$/i)
})
phone.addEventListener('input',(e)=>{
    validation(e, /^\+7\(\d{3}\)\d{3}-\d{4}$/)
})
email.addEventListener('input',(e)=>{
    validation(e, /^[^ ]+@[^ ]+\.[a-z]{2,3}$/)
})
text.addEventListener('input',(e)=>{
    validation(e, /.+/)
})


form.addEventListener('submit',(event)=>{
    event.preventDefault()
        console.log()
        if(notValidated.size!==0)
        alert("Неверно заполнены поля: " + Array.from(notValidated).join(", "))
    else alert("Данные отправленны")
}
)