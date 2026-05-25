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
productsModel.setSelectedProduct(apiProducts.items[3]);

const basketModel = new Basket();
basketModel.addProductInBasket(apiProducts.items[0]);
basketModel.addProductInBasket(apiProducts.items[2]);

const buyerModel = new Buyer();

// Работа с каталогом товаров
console.log('Массив товаров из каталога: ', productsModel.getProducts());
console.log('Поиск товара по ID: ', productsModel.getProductByID('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));
console.log('Получение товара для отображения: ', productsModel.getSelectedProduct());

// Работа с корзиной
console.log('Получаем товары, которые находятся в корзине: ', basketModel.getSelectedProduct());
console.log('Проверяем, есть ли товар в корзине по его ID(b06cde61-912f-4663-9751-09956c0eed67): ',
  basketModel.haveProductById('b06cde61-912f-4663-9751-09956c0eed67'));
console.log('Количество товаров в корзине: ', basketModel.getSumProduct())
// Удаляем товар из корзины:
basketModel.deleteProductFromBasket(apiProducts.items[2]);
console.log('Получаем товары, которые находятся в корзине, за вычетов удаленного: ', basketModel.getSelectedProduct());
// Очищаем корзину
basketModel.clearBasket();
console.log('Получаем очищенную корзину: ', basketModel.getSelectedProduct());

// Работа с покупателем
// Сохраняем данные о покупателе
buyerModel.saveAddress('обская, 5');
buyerModel.saveEmail('pochta@pochta.ru');
buyerModel.savePayment('online');
buyerModel.savePhone('+79556665544');
//Выводим данные покупателя в консоль
console.log('Массив данных покупателя: ', buyerModel.getBuyerDetails());
// Проверка валидации данных
console.log('Валидация адреса: ', buyerModel.validAddress());
console.log('Валидация почты: ', buyerModel.validEmail());
console.log('Валидация способа оплаты: ', buyerModel.validPayment());
console.log('Валидация телефона: ', buyerModel.validPhone());
// Очищаем данные о покупателе
buyerModel.clearBuyerDetails();
console.log('Массив очищенных данных покупателя: ', buyerModel.getBuyerDetails());

// API
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi.getListProducts()
  .then((data) => {
    productsModel.setProducts(data.items);
    console.log('Получаем товары: ', productsModel.getProducts());
  })
  .catch(error => console.log(`Произошла ошибка: ${error}`));