// const { faker } = require("@faker-js/faker");
// const { default: axios } = require("axios");

// for (let index = 0; index < 10; index++) {
//   console.log({
//     product: faker.commerce.product(),
//     name: faker.commerce.productName(),
//     category: faker.commerce.productAdjective(),
//     price: faker.commerce.price({ min: 100, max: 200 }),
//     discount: faker.commerce.price({ min: 1, max: 30 }),
//     SaleDiscount: faker.commerce.price({ min: 1, max: 20 }),
//     description: faker.commerce.productMaterial(),
//   });
// }
const fs = require("fs");
const data = require("./users.json");
let newUsers = data.map((d) => {
  d.password = `${d.firstName}@123`;
  if (!d.role) {
    d.role = `buyer`;
  }
  return d;
});

fs.writeFile("users.json", JSON.stringify(newUsers), function (err) {
  if (err) throw err;
  console.log("complete");
});
