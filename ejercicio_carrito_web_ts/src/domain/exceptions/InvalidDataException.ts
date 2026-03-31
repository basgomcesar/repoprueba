export default class InvalidDataException implements Error{
  constructor(message: string){
    this.message = "Datos invalidos";
    this.name = "InvalidDataException";
  }
  name: string;
  message: string;
  stack?: string | undefined;
  
}
