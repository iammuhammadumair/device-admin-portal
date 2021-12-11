const response = ({ responseCode = 200, message = "success", data = {} }) => {
  return {
    response_code: responseCode,
    message: message,
    data: data,
  };
};

module.exports = {
  success: ({ message, data } = {}) =>
    response({ responseCode: 200, message, data }),
  unprocessableEntity: ({ message, data }) =>
    response({ responseCode: 422, message, data }),
  internalServerError: ({ data } = {}) =>
    response({
      responseCode: 500,
      message: "Service is currently unavailable. Please try again later.",
      data,
    }),
};
