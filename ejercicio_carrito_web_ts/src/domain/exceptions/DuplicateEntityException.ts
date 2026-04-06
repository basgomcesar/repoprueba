export default class DuplicateEntityException implements Error{
  name: string = 'DuplicateEntityException';
  stack?: string | undefined;

  constructor(public message: string){
  }
}
