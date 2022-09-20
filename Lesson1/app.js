const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'Shoes-2'},
    {price: 52},
];

const renderGoodsItem = ({title  = "Нет названия", price = "Нет цены"}) => `<div class="col-4"><div class="card"><div class="card-body">
<h5 class="card-title">${title}</h5><p class="card-text">${price} ${isNaN(--price) ? "":" руб" }</p></div></div></div>`
//return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;


const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML= goodsList.join('\n') ; //запятые появляются т.к. при добавлении
    //массива в элемент goods-list он преобразуется к строке методом toString(), который оставляет запятые,
    //как вариант можо объединить массив в одну строку, а в качестве разделителей использовать \n
}

renderGoodsList(goods);