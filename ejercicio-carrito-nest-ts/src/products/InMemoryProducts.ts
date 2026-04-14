import { Product } from "./Product";
import ProductRepository from "./ProductRepository";

export class InMemoryProducts implements ProductRepository  {
    getAllProducts(): Product[] {
        throw new Error("Method not implemented.");
    }
    findProductBySKU(sku: string): boolean {
        return InMemoryProducts.products.some((p) => p.getSKU() === sku);
    }
    getProductById(idProduct: number): Product {
        throw new Error("Method not implemented.");
    }
    updateProduct(product: Product): void {
        throw new Error("Method not implemented.");
    }
    saveProduct(product: Product): Product {
        product = new Product(product.getId(), product.getName(), product.getPrice(), product.getSKU(), product.getStock());
        InMemoryProducts.products.push(product);
        return product;
    }
    static products: Product[] = [];  
}