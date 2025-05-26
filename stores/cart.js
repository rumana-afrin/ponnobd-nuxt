// stores/cart.js
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    loadFromStorage() {
      if (import.meta.client) {
        const stored = localStorage.getItem("cartitem");
        this.items = stored ? JSON.parse(stored) : [];
      }
    },
    addItem(item) {
      this.items.push(item);
      this.updateStorage();
    },
    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId);
      this.updateStorage();
    },
    updateStorage() {
      if (import.meta.client) {
        localStorage.setItem("cartitem", JSON.stringify(this.items));
      }
    },
    getTotal() {
      return this.items.reduce((total, item) => total + item.price, 0);
    },
    totalItems() {
      return this.items.length;
    },
    emptyCart() {
      this.items = [];
      if (import.meta.client) {
        localStorage.removeItem("cartitem");
      }
    },
    updateTotalQuantity(itemId, quantity) {
      const itemIndex = this.items.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        this.items[itemIndex].quantity = quantity; 
        this.updateStorage();
      }
    },
    updateTotalPrice(){
      this.items.forEach(item => {
        item.totalPrice = parseFloat(item.price) * item.quantity;
      });
      this.updateStorage();
    }
  }
});
