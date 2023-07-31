export class ServerResponse
{
  constructor({ success = true, message = '', code = 200, collection = [] })
  {
    this.success = success;
    this.message = message;
    this.code = code;
    this.collection = collection;
  }
}