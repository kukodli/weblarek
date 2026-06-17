import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { LarekApi } from './components/models/LarekApi';
import { API_URL } from './utils/constants';
import { EventEmitter } from './components/base/Events';
import { Gallery } from './components/views/Gallery';
import { BasketView } from './components/views/BasketView';
import { Modal } from './components/views/Modal';
import { Header } from './components/views/Header';
import { CardCatalog } from './components/views/CardCatalog';
import { cloneTemplate } from './utils/utils';
import { CardModal } from './components/views/CardModal';
import { CardBasket } from './components/views/CardBasket';
import { OrderForm } from './components/views/OrderForm';
import { Success } from './components/views/Success';
import { ContactsForm } from './components/views/ContactsForm';
import { IProduct } from './types';

const events = new EventEmitter();
const catalog = new ProductCatalog([], null, events);
const basket = new Basket([], events);
const buyer = new Buyer('','','','', events);
const api = new Api(API_URL);
const larekApi = new LarekApi(api);

// Контейнеры
const galletyContainer = document.querySelector('.gallery') as HTMLElement;
const modalContainer = document.getElementById('modal-container') as HTMLElement;
const headerContainer = document.querySelector('.header') as HTMLElement;

// Представления
const gallery = new Gallery(galletyContainer);
const modal = new Modal(modalContainer);
const header = new Header(events, headerContainer);
const preview = new CardModal(cloneTemplate('#card-preview'), {
  onClick() {
    events.emit('preview:toggle');
  }
});
const view = new BasketView(cloneTemplate('#basket'), events);
const orderForm = new OrderForm(cloneTemplate('#order'), events);
const contactsForm = new ContactsForm(cloneTemplate('#contacts'), events);
const success = new Success(cloneTemplate('#success'), {
    onClick() {
      events.emit('success:close');
    }
  });

larekApi.getListProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch(console.error);

events.on('catalog:changed', () => {
  const cards = catalog.getProducts().map((product) => {
    const card = new CardCatalog(cloneTemplate('#card-catalog'), {
      onClick: () => {
        events.emit('card:select', product);
      }
    });
    return card.render({
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  });
  gallery.render({
    catalog: cards,
  });
});

events.on<IProduct>('card:select', (product) => {
  catalog.setSelectedProduct(product);
  events.emit('product:selected');
});

events.on('product:selected', () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;
  modal.content = preview.render({
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
  });
  if (product.price === null) {
    preview.disabled = true;
  } else {
    preview.button = basket.haveProductById(product.id)
    ? 'Удалить из корзины'
    : 'В корзину';
  }
  modal.content = preview.render();
  modal.open();
});

events.on('preview:toggle', () => {
  const product = catalog.getSelectedProduct();
  if (!product || product.price === null) return;
  if (basket.haveProductById(product.id)) {
    basket.deleteProductFromBasket(product);
  } else {
    basket.addProductInBasket(product);
  }
  modal.close();
})

events.on('basket:open', () => {
  modal.content = view.render();
  modal.open();
});

events.on('basket:changed', () => {
  view.render({
    items: basket.getSelectedProduct().map((product, index) => {
      const item = new CardBasket(cloneTemplate('#card-basket'), {
        onDeleteClick() {
          basket.deleteProductFromBasket(product);
        }
      });
      return item.render({
        title: product.title,
        price: product.price,
        index: index+1,
      });
    }),
    sum: basket.getPriceSelectedProduct(),
  });
  if (basket.getSumProduct() === 0) {
    view.disabled = true;
  }
  header.render({
    counter: basket.getSumProduct(),
  });
});

events.on('basket:submit', () => {
  orderForm.valid = false;
  modal.content = orderForm.render({
    ...buyer.getBuyerDetails(),
  })
});

events.on<{ payment: string }>('order:payment-change', (data) => {
  buyer.savePayment(data.payment === 'card' ? 'online' : 'offline');
});

events.on<{ field: string, value: string }>('order:change', (data) => {
  if (data.field === 'address') {
    buyer.saveAddress(data.value);
  }
});

events.on('order:submit', () => {
  if (!buyer.validPayment().isValid || !buyer.validAddress().isValid) {
    return;
  }
  modal.content = contactsForm.render();
})

events.on<{ field: string, value: string }>('contacts:change', (data) => {
  if (data.field === 'email') {
    buyer.saveEmail(data.value);
  }
  if (data.field === 'phone') {
    buyer.savePhone(data.value);
  }
});

events.on('buyer:changed', () => {
  const data = buyer.getBuyerDetails();
  orderForm.render({
    address: data.address,
    payment: data.payment,
    valid: buyer.validAddress().isValid && buyer.validPayment().isValid,
    errors: [
      buyer.validAddress().error,
      buyer.validPayment().error,
    ].filter(Boolean).join(', ')
  });
  contactsForm.render({
    email: data.email,
    phone: data.phone,
    valid: buyer.validEmail().isValid && buyer.validPhone().isValid,
    errors: [
      buyer.validEmail().error,
      buyer.validPhone().error,
    ].filter(Boolean).join(', ')
  })
});

events.on('contacts:submit', async () => {
  try {const buyerData = buyer.getBuyerDetails();
  if (!buyerData.payment) {
    return
  };
  const result = await larekApi.postOrder({
    payment: buyerData.payment,
    address: buyerData.address,
    email: buyerData.email,
    phone: buyerData.phone,
    items: basket.getSelectedProduct().map(i => i.id),
    total: basket.getPriceSelectedProduct(),
  });
  basket.clearBasket();
  buyer.clearBuyerDetails();
  modal.content = success.render({
    total: result.total,
  })} catch(error) {
    console.log(error);
  }
})

events.on('success:close', () => {
  modal.close();
});