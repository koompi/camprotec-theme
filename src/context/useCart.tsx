"use client";

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  JSX,
} from "react";

import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { CartContextType, CartItem } from "@/types/global";
import { ItemProduct } from "@/types/product";

export const CartContext = createContext({});

export function CartProvider(props: { children: JSX.Element }) {
  const router = useRouter();
  const { getUser } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carts = localStorage.getItem("cartItems");
    setLoading(true);
    if (carts) {
      if (carts.length > 0) {
        setCartItems(JSON.parse(carts));
        setTimeout(() => {
          setLoading(false);
        }, 500);
        return;
      }
    }
    setTimeout(() => {
      setLoading(false);
      return;
    }, 500);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return;
    }
  }, [cartItems]);

  const updateLocalStorage = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const addToCart = (product: ItemProduct, variant: boolean) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) =>
        variant
          ? item.product?.variantId === product?.variantId
          : item.product?.id === product?.id
      );
      if (existingItem) {
        return prevItems.map((res) =>
          !variant
            ? res.product?.id === product?.id
              ? { ...res, quantity: res.quantity + 1 }
              : res
            : res.product?.variantId === product?.variantId
            ? { ...res, quantity: res.quantity + 1 }
            : res
        );
      }
      const newItem: CartItem = { product, quantity: 1 };
      const updatedItems = [...prevItems, newItem];
      return updatedItems;
    });
    updateLocalStorage();
  };

  const minusCart = (product: ItemProduct, variant: boolean) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems?.find((item) =>
        variant
          ? item.product?.variantId === product?.variantId
          : item.product?.id === product?.id
      );
      if (existingItem) {
        return prevItems?.map((res) =>
          !variant
            ? res.product?.id === product?.id
              ? { ...res, quantity: res.quantity - 1 }
              : res
            : res.product?.variantId === product?.variantId
            ? { ...res, quantity: res.quantity - 1 }
            : res
        );
      }
      const updatedItems = prevItems?.filter((item: CartItem) =>
        variant
          ? item.product?.variantId === product?.variantId
          : item.product?.id === product?.id
      );
      return updatedItems;
    });
    updateLocalStorage();
  };

  const removeFromCart = (productId: string, variant: boolean) => {
    if (cartItems.length == 1) {
      cleanCartItems();
      return;
    }
    setCartItems((prevItems) => {
      const updatedItems = prevItems?.filter(
        (item) => item.product.id !== productId
      );
      const updatedVariant = prevItems?.filter(
        (item) => item.product.variantId !== productId
      );
      return variant ? updatedVariant : updatedItems;
    });

    updateLocalStorage();
  };

  const cleanCartItems = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const addCarts = (items: CartItem[]) => {
    setCartItems(items.concat(cartItems));
    updateLocalStorage();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    getUser();
    addCarts(cartItems);
    router.push("/");
  };

  return (
    <CartContext.Provider
      value={{
        loading: loading,
        cartItems: cartItems,
        addToCart: addToCart,
        addCarts: addCarts,
        removeFromCart: removeFromCart,
        minusCart: minusCart,
        cleanCartItems: cleanCartItems,
        logout: logout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext) as CartContextType;
