import create from "zustand";
import { client } from "../lib/shopify";

const useCart = create((set, get) => ({
  cartId:
    typeof window !== "undefined" && window.localStorage.getItem("cartId"),
  createCart: async () => {
    const storage = window.localStorage;
    let cartId = storage.getItem("cartId");
    let cart = null;

    if (!cartId) {
      cart = await client.checkout.create();
      cartId = cart.id;
    } else {
      cart = await client.checkout.fetch(cartId);
    }

    storage.setItem("cartId", cartId);
    set({ cartId, cart });
  },
  addItemToCart: async (item) => {
    const alreadyOnCart = get().cart.lineItems.find(
      (c) => c.variant.id === item.variantId
    );

    if (alreadyOnCart) {
      return await client.checkout.updateLineItems(get().cartId, {
        id: alreadyOnCart.id,
        quantity: alreadyOnCart.quantity + 1,
      });
    }

    return await client.checkout.addLineItems(get().cartId, item);
  },
  removeItemFromCart: async (item) => {
    return await client.checkout.removeLineItems(get().cartId, item.id);
  },
  cart: null,
  setCart: (cart) => set({ cart }),
  showCart: false,
  setShowCart: (showCart) => {
    set({ showCart });
  },
}));

export default useCart;
