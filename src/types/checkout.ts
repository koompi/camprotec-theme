export type DeliveryType = {
  photos: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
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
