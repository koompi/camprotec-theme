"use client";

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  JSX,
} from "react";
import { Toaster, toast } from "sonner";

// import { useAuth } from "./useAuth";
// import { useRouter } from "next/navigation";
import { CartContextType, CartItem } from "@/types/global";
import { ItemProduct } from "@/types/product";

export const CartContext = createContext({});

export function CartProvider(props: { children: JSX.Element }) {
  // const router = useRouter();
  // const { getUser } = useAuth();
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

  const addToCart = (product: ItemProduct) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((res) =>
          res.product?.id === product?.id
            ? { ...res, quantity: res.quantity + 1 }
            : res
        );
      }
      const newItem: CartItem = { product, quantity: 1 };
      const updatedItems = [...prevItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const minusCart = (product: ItemProduct) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems?.find(
        (item) => item.product?.id === product?.id
      );
      if (existingItem) {
        return prevItems?.map((res) =>
          res.product?.id === product?.id
            ? { ...res, quantity: res.quantity - 1 }
            : res
        );
      }
      const updatedItems = prevItems?.filter(
        (item: CartItem) => item.product?.id === product?.id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (id: String) => {
    setCartItems((prevItems) => {
      const item = prevItems.filter((item) => item.product.id != id);
      localStorage.setItem("cartItems", JSON.stringify(item));
      return item;
    });
  };

  const cleanCartItems = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  const addCarts = (items: CartItem[]) => {
    toast.success("The product is added into the cart!");
    setCartItems(items.concat(cartItems));
    updateLocalStorage();
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    if (typeof window !== "undefined") {
      global && window.location.reload();
    }
  };

  if (loading) {
    return null;
  }

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
      <Toaster position="top-center" />
      {props.children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext) as CartContextType;
