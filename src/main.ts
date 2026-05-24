import './scss/styles.scss';
import { apiProducts } from './utils/data';
import { ProductCatalog } from './components/models/ProductCatalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { LarekApi } from './components/models/LarekApi';
import { API_URL } from './utils/constants';

const productsModel = new ProductCatalog();
productsModel.setProducts(apiProducts.items);

const basketModel = new Basket(apiProducts.items);

const buyerModel = new Buyer();

console.log('Массив товаров из каталога: ', productsModel.getProducts())
console.log('Массив выбранных товаров: ', basketModel.getSelectedProduct())
console.log('Массив данных покупателя: ', buyerModel.getBuyerDetails())

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi.getListProducts()
.then((data) => {
  productsModel.setProducts(data.items);
  console.log('Получаем товары: ', productsModel.getProducts());
})
.catch(error => console.log(`Произошла ошибка: ${error}`));