export default class DuplicateEntityException implements Error{
  constructor(public message: string){
  }
  name: string;
  stack?: string | undefined;
}
