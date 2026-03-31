export default class Producto {
    private id: number;
    private nombre: string;
    private precio: number;
    private stock: number;

    constructor(id: number, nombre: string, precio: number, stock: number) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getStock(): number {
        return this.stock;
    }

    public setStock(stock: number): void {
        this.stock = stock;
    }
}

