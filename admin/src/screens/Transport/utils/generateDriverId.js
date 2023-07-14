function generateDriverId() {
  const prefix = "DRV";
  const length = 8;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let result = prefix;
  for (let i = 0; i < length - prefix.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
  // return "DRV1A9B8";
}

function generateVehicleId() {
  // const prefix = "DRV";
  // const length = 8;
  // const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // let result = prefix;
  // for (let i = 0; i < length - prefix.length; i++) {
  //   result += characters.charAt(Math.floor(Math.random() * characters.length));
  // }

  // return result;
  return "VEH4C5JM";
}

function generateRouteId() {
  const prefix = "RT";
  const length = 8;
  const characters = "0123456789";

  let result = prefix;
  for (let i = 0; i < length - prefix.length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export { generateDriverId };
export { generateVehicleId };
export { generateRouteId };
