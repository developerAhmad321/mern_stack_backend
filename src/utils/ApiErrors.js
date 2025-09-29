class ApiErrors extends Error{
    constructor(
        statusCode,
        message= "something went wrong",
        errors=[],
        stack= ""
    ){
        super(message)
        this.statusCode= statusCode
        this.errors = errors
        this.success = false
        this.message = message
        this.data = null
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiErrors}



// function ApiError(statusCode, message = "Something went wrong", errors = [], stack = "") {
//   const error = new Error(message);

//   error.statusCode = statusCode;
//   error.errors = errors;
//   error.success = false;
//   error.message = message;
//   error.data = null;

//   if (stack) {
//     error.stack = stack;
//   } else {
//     Error.captureStackTrace(error, ApiError);
//   }

//   return error;
// }

// export { ApiError };