const response = ({ responseCode = 200, message = "success", data = {} }) => {
  return {
    response_code: responseCode,
    message: message,
    data: data,
  };
};
const success =  ({ message, data } = {}) =>
response({ responseCode: 200, message, data })
const unprocessableEntity= ({ message, data }) =>
    response({ responseCode: 422, message, data })
const internalServerError =  ({ data } = {}) =>
response({
  responseCode: 500,
  message: "Service is currently unavailable. Please try again later.",
  data,
})
const unauthorized =  ({ data } = {}) =>
response({
  responseCode: 401,
  message: "Unauthorized",
  data,
})

export {
    success , 
    unprocessableEntity,
    internalServerError,
    unauthorized
}