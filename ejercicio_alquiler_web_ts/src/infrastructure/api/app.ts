import express, { Request, Response } from "express";
import InMemoryRentalRepository from "../InMemoryRentalRepository";
import { StartRentalUseCase } from "../../../src/application/StartRentalUseCase";
import RentalService from "./controllers/rental.service";
import createRentalRoutes from "./routes/rental.route";
import ReturnCarUseCase from "../../../src/application/ReturnCarUseCase";
import InMemoryUserRepository from "../InMemoryUserRepository";
import InMemoryCarRepository from "../InMemoryCarRepository";
const app = express();
const port = 3000;
app.use(express.json());


const rentalRepo = new InMemoryRentalRepository();
const carRepo = new InMemoryCarRepository();
const userRepo = new InMemoryUserRepository();
const addRental = new StartRentalUseCase(rentalRepo, carRepo, userRepo);
const returnCar = new ReturnCarUseCase(rentalRepo, carRepo, userRepo);

const rentalService = new RentalService(addRental, returnCar);

app.use("/api/", createRentalRoutes(rentalService));

const server = app
  .listen(port, () => {
    console.log("Server running at PORT: ", port);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

export { app, server };
