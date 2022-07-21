import { Item } from '../server/item';

interface ShopItem {
  label: string;
  price: number;
}

interface CartItem {
  item: ShopItem;
  amount: number;
}

const ShopList: ShopItem[] = [
  { label: 'Apple', price: 0.2 },
  { label: 'Orange', price: 0.3 },
  { label: 'Mango', price: 0.4 },
  { label: 'Milk', price: 2.7 },
  { label: 'Cola', price: 1.5 },
  { label: 'Water', price: 0.4 },
  { label: 'Bread', price: 1 },
  { label: 'Egg', price: 0.3 },
  { label: 'Butter', price: 4 },
  { label: 'Meat', price: 6.6 },
];

class Module {
  cartItems: CartItem[] = [];

  async onload() {
    console.log("1");
    await this.load();
    console.log("2");
    this.displayShopItems();
    this.displayCartItems();
    this.createButton();
  }

  load(): Promise<void> {
    return new Promise<void>(resolve => {
      fetch(location.origin + '/get', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      })
        .then(response => {
          return response.json();
        })
        .then((response: Item[]) => {
          this.cartItems = response.map(item => this.convertItemToCartItem(item));
          resolve();
        });
    });
  }

  addCartItem(shopItem: ShopItem): void {
    let cartItem: CartItem | undefined = this.getCartItem(shopItem);
    if (!cartItem) {
      cartItem = { item: shopItem, amount: 0 };
      this.cartItems.push(cartItem);
    }
    cartItem.amount++;
    this.displayCartItems();
    this.addRequest(shopItem);
  }

  addRequest(item: ShopItem): void {
    fetch(location.origin + '/add', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        name: item.label,
      })
    });
  }

  getCartItem(shopItem: ShopItem): CartItem | undefined {
    if (this.cartItems.length === 0) {
      return undefined;
    }
    for (const cartItem of this.cartItems) {
      if (cartItem.item.label === shopItem.label) {
        return cartItem;
      }
    }
    return undefined;
  }

  displayShopItems(): void {
    const div = document.getElementById('shop') as HTMLDivElement;
    ShopList.forEach(item => {
      const itemDiv: HTMLDivElement = document.createElement('div');
      itemDiv.innerText = item.label;
      itemDiv.className = 'item';
      itemDiv.onclick = () => this.addCartItem(item);
      const priceDiv: HTMLDivElement = document.createElement('div');
      priceDiv.innerText = '$' + item.price;
      priceDiv.className = 'price';
      itemDiv.appendChild(priceDiv);
      div.appendChild(itemDiv);
    });
  }

  displayCartItems(): void {
    const div = document.getElementById('cart') as HTMLDivElement;
    div.innerHTML = '';
    let total = 0;
    this.cartItems.forEach(cart => {
      const itemDiv: HTMLDivElement = document.createElement('div');
      itemDiv.className = 'item';

      const nameSpan: HTMLSpanElement = document.createElement('span');
      nameSpan.innerText = cart.item.label;
      itemDiv.appendChild(nameSpan);

      const amountSpan: HTMLSpanElement = document.createElement('span');
      amountSpan.innerText = cart.amount.toString();
      itemDiv.appendChild(amountSpan);

      const priceSpan: HTMLSpanElement = document.createElement('span');
      let totalPrice: number = cart.amount * cart.item.price;
      total += totalPrice;
      totalPrice = Math.round(totalPrice * 10) / 10;
      priceSpan.innerText = '$' + totalPrice.toString();
      itemDiv.appendChild(priceSpan);

      div.appendChild(itemDiv);
    });
    // Calculate total price
    const totalDiv: HTMLDivElement = document.createElement('div');
    totalDiv.className = 'total';

    const nameSpan: HTMLSpanElement = document.createElement('span');
    nameSpan.innerText = 'Total';
    nameSpan.className = 'label';
    totalDiv.appendChild(nameSpan);

    const priceSpan: HTMLSpanElement = document.createElement('span');
    total = Math.round(total * 10) / 10;
    priceSpan.innerText = '$' + total.toString();
    totalDiv.appendChild(priceSpan);

    div.appendChild(totalDiv);
  }

  createButton(): void {
    const div = document.getElementById('button') as HTMLDivElement;
    const button: HTMLButtonElement = document.createElement('button');
    button.innerText = 'Clear Cart';
    button.onclick = () => this.clear();
    div.appendChild(button);
  }

  clear(): void {
    this.cartItems = [];
    this.displayCartItems();
    fetch(location.origin + '/clear', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });
  }

  convertItemToCartItem(item: Item): CartItem {
    for (const shopItem of ShopList) {
      if (shopItem.label === item.label) {
        return {
          item: shopItem,
          amount: item.amount
        };
      }
    }
    throw new Error('Item not found');
  }
}
export const module = new Module();

window.addEventListener('load', () => {
  module.onload();
});
