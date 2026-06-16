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

larekApi.getListProducts()
  .then((data) => {
    catalog.setProducts(data.items);
  })
  .catch(console.error);

events.on('catalog:changed', () => {
  const cards = catalog.getProducts().map((product) => {
    const card = new CardCatalog(cloneTemplate('#card-catalog'), {
      onClick: () => {
        catalog.setSelectedProduct(product);
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

events.on('product:selected', () => {
  const product = catalog.getSelectedProduct();
  if (!product) return;
  const preview = new CardModal(cloneTemplate('#card-preview'), {
    onClick() {
      if (product.price === null) {
        return;
      }
      if (basket.haveProductById(product.id)) {
        basket.deleteProductFromBasket(product);
        preview.button = 'В корзину';
      } else {
        basket.addProductInBasket(product);
        preview.button = 'Удалить из корзины';
      }
    }
  });
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

events.on('basket:open', () => {
  const view = new BasketView(cloneTemplate('#basket'), events);
  view.render({
    items: basket.getSelectedProduct().map((product, index) => {
      const item = new CardBasket(cloneTemplate('#card-basket'), {
        onDeleteClick() {
          basket.deleteProductFromBasket(product);
          events.emit('basket:open');
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
  modal.content = view.render();
  modal.open();
});

events.on('basket:changed', () => {
  header.render({
    counter: basket.getSumProduct()
  });
});

let orderForm: OrderForm | null = null;

events.on('basket:submit', () => {
  orderForm = new OrderForm(cloneTemplate('#order'), events);
  orderForm.valid = false;
  modal.content = orderForm.render({
    address: '',
    payment: '',
    errors: '',
    valid: false,
  })
  modal.open();
});

events.on<{ payment: string }>('order:payment-change', (data) => {
  buyer.savePayment(data.payment === 'card' ? 'online' : 'offline');
});

events.on<{ field: string, value: string }>('order:change', (data) => {
  if (data.field === 'address') {
    buyer.saveAddress(data.value);
  }
});

events.on('buyer:changed', () => {
  const payment = buyer.validPayment();
  const address = buyer.validAddress();

  if (!orderForm) return;
  orderForm.valid = payment.isValid && address.isValid;
  orderForm.errors = [
    payment.error,
    address.error,
  ].filter(Boolean).join(', ');
});

let contactsForm: ContactsForm | null = null;

events.on('order:submit', () => {
  if (!buyer.validPayment().isValid || !buyer.validAddress().isValid) {
    return;
  }

  contactsForm = new ContactsForm(cloneTemplate('#contacts'), events);
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
  if (contactsForm) {
    const email = buyer.validEmail();
    const phone = buyer.validPhone();
    contactsForm.valid = email.isValid && phone.isValid;
    contactsForm.errors = [
      email.error,
      phone.error,
    ].filter(Boolean).join(', ');
  }
});

events.on('contacts:submit', async () => {
  const buyerData = buyer.getBuyerDetails();
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
  const success = new Success(cloneTemplate('#success'), {
    onClick() {
      modal.close();
      basket.clearBasket();
      buyer.clearBuyerDetails();
    }
  });
  modal.content = success.render({
    total: result.total,
  })
})