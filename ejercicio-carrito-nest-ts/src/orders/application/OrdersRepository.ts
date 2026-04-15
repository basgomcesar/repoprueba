import Order from '../domain/Order';
export default interface OrdersRepository {
    getAllOrders(): Order[];
    getOrderById(idOrder: number): Order;
    saveOrder(order: Order): Order;
    updateOrder(order: Order): void;
}