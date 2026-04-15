import OrdersRepository from "../application/OrdersRepository";
import Order from "../domain/Order";

export default class InMemoryOrders implements OrdersRepository {
    static orders: Order[] = [];


    getOrderById(idOrder: number): Order {
        const order = InMemoryOrders.orders.find((o) => o.getUserId() === idOrder);
        if (!order) {
            throw new Error("Orden no encontrada");
        }
        return order;
    }
    
    saveOrder(order: Order): Order {
        InMemoryOrders.orders.push(order);
        return order;
    }

    updateOrder(order: Order): void {
        InMemoryOrders.orders = InMemoryOrders.orders.map((o) =>
            o.getUserId() === order.getUserId() ? order : o
        );
    }

    getAllOrders(): Order[] {
        return InMemoryOrders.orders;
    }


}