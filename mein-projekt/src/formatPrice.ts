export const formatPrice = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
}).format;
