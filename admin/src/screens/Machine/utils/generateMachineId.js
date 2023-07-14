function generateMachineId() {
  const prefix = "MCH";
  const length = 8;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = prefix;
  for (let i = 0; i < length - prefix.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
  // return "MCH13453";
}

export { generateMachineId };
