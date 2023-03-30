export const formatNumberToCurrency = (
  value: number,
  currency: string = "BRL"
) => {
  return Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(
    value
  );
};
