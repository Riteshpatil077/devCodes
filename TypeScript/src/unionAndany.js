"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let set = 10; // union type
console.log(set);
let orders = ["1", "2", "3"]; // type inference
let currOrder; // union type
for (let order of orders) {
    if (order === "12") {
        currOrder = order;
        break;
    }
}
console.log(currOrder);
//# sourceMappingURL=unionAndany.js.map