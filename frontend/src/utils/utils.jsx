const formatPrice = (price) => {
    const [integerPart, decimalPart] = price.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
  }
  
  export { formatPrice }