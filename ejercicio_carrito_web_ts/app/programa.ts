import express, { Request, Response } from "express";
import { RepositorioProductosEnMemoria } from "./repositorioProducto";
import SistemaCarrito from "./sistema";
import { Product } from "../src/domain/Product";
import { ProductoYaExisteError } from "./productoyaexiste";
const app = express();
const port = 3000;
app.use(express.json());

app.post("/compras", (req: Request, res: Response) => {
  const repositorioProductos = new RepositorioProductosEnMemoria();
  const sistemaCarrito = new SistemaCarrito(repositorioProductos);
  const newProducto = req.body;
  //VALIDAR PRODUCTO
  if (!newProducto.id || !newProducto.nombre || !newProducto.precio || !newProducto.stock) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  //LLAMAR A SISTEMA PARA GUARDAR EL PRODUCTO
  try {
  sistemaCarrito.agregarProducto(new Product(newProducto.id, newProducto.nombre, newProducto.precio, newProducto.stock));
  } catch (error) {
    if (error instanceof ProductoYaExisteError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
  }
  res.status(201).json(newProducto);
});

app.get("/compras",(req: Request, res: Response)=> {
  const repositorioDeProductos = new RepositorioProductosEnMemoria();
  const sistemaCarrito = new SistemaCarrito(repositorioDeProductos);
  const productos = sistemaCarrito.obtenerProductos();
  res.json(productos);
})

const server = app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

export { app, server };
