import Order from '../domain/Order';
export default interface OrdersRepository {
    getAllOrders(): Order[];
    getOrderById(idOrder: string): Order;
    saveOrder(order: Order): Order;
    updateOrder(order: Order): void;
}