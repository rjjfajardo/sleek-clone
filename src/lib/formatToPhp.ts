export const formatToPhp = (amount: number) => {
  const PHP = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  });

  return PHP.format(amount);
};
