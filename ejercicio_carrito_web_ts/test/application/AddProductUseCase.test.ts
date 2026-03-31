import { Product } from "src/domain/Product";
import InvalidDataException from "../../src/domain/exceptions/InvalidDataException";
import DuplicateEntityException from "../../src/domain/exceptions/DuplicateEntityException";

describe("Tests para AddProductUseCase", ()=>{
  it("Se crea un Producto con exito",()=>{
    const product = new Product(1,"Galletas Marias",25, 300);
    const repository = new ProductRepository();
    const addProduct = new AddProductUseCase(repository);
    expect(addProduct.createProduct(product)).toBe(product);
  });
  it("Error al crear un Producto con stock negativo ",()=>{
    const product = new Product(1,"Galletas Marias",25, -1);

    const repository = new ProductRepository();
    const addProduct = new AddProductUseCase(repository);
    expect(addProduct.createProduct(product)).toThrow(InvalidDataException);
  });
  it("Error al crear un Producto con id duplicado",()=>{
    const product = new Product(1,"Galletas Marias",25, 200);
    const productGalletas = new Product(1,"Galletas Emperador",25, 200);
    const repository = new ProductRepository();
    const addProduct = new AddProductUseCase(repository);
    addProduct.createProduct(product)
    expect(addProduct.createProduct(productGalletas)).toThrow(DuplicateEntityException);
  });
});
