import { Address } from "./address";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {
    constructor(
        public shippingAddress: Address,
        public billingAddress: Address,
        public order: Order,
        public orderItems: OrderItem[],
    ) {

    }
}
