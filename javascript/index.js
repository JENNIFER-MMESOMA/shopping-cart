class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.updateCartDisplay();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateCartDisplay();
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    updateCartDisplay() {
      const cartItemsDiv = document.getElementById('cart-items');
      cartItemsDiv.innerHTML = '';
  
      this.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.product.name} - Quantity: ${item.quantity}, Total: $${item.getTotalPrice().toFixed(2)}`;
        cartItemsDiv.appendChild(itemDiv);
      });
  
      document.getElementById('total-items').textContent = this.getTotalItems();
      document.getElementById('total-price').textContent = this.getTotalPrice().toFixed(2);
    }
  }
  
  const cart = new ShoppingCart();
  
  document.getElementById('products').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
      const product = new Product(
        event.target.dataset.id,
        event.target.dataset.name,
        parseFloat(event.target.dataset.price)
      );
      cart.addItem(product, 1);
    }
  });
  