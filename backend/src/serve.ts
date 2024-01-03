import chalk from "chalk";
import { AddressInfo } from "net";

import app from "./app.js";

const port = process.env.PORT || 8081;

// const server = app.listen(port, () => {
//   const address = server.address() as AddressInfo;

//   if (address) {
//     console.log(chalk.green.bold.underline(`Server is up & listening at http://127.0.0.1:${address.port}...`))
//   } else {
//     console.error("Failed to retrieve server address.");
//   }
// });

const server = app.listen(Number(port), "0.0.0.0", () => {
  const address = server.address() as AddressInfo;

  if (address) {
    console.log("ADDRESS ", address)
    console.log(chalk.green.bold.underline(`Server is up & listening at http://localhost:8080...`))
  } else {
    console.error("Failed to retrieve server address.");
  }
});
