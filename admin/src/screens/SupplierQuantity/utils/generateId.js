function generateSupplierId() {
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  const supplierId = `SUP${randomNum}`;
  return supplierId;
}

export { generateSupplierId };
