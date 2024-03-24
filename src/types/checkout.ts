export type DeliveryType = {
  photos: string;
  firstName: string;
  lastName: string;
  address: string[];
  email: string;
  phoneNumber: string;
  instruction?: string;
  express: string;
  id: string;
  logo: string;
  addressName: string;
  customerName: string;
};

export type PaymentType = {
  method: "CARD" | "PAYPAL" | "BITCOIN" | "CASH";
  nameCard: string;
  numberCard: string;
};

export type CheckoutType = {
  delivery_option: string;
  // delivery_express: string;
  payment: "CASH";
};

export type CustomerAdressType = {
  id: string;
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  addressName: string;
  phoneNumber: string;
  photos: string[];
  storeId: string;
  label: string;
};

export type CheckoutCartType = {
  productId: string;
  qty: number;
  unitPrice: number;
};

export type OrdersType = {
  carts: CheckoutCartType[];
  code: string;
  createdAt: string;
  id: string;
  ownerId: string;
  status: string;
  tax: string;
  totalDiscount: number;
  totalPrice: number;
};
