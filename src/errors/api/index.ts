class ApiError extends Error {
  statusCode: number;
  data: {};

  constructor(msg: string, statusCode: number, data: {} = {}) {
    super(msg);
    this.statusCode = statusCode;
    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}

export default ApiError;
