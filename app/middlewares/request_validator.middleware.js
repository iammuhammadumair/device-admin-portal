
import {unprocessableEntity} from  '../utils/response.util';
/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const requestValidator = (resourceSchema) => async (req, res, next) => {
  const resource = req.body;
  try {
    // throws an error if not valid
    await resourceSchema.validate(resource);
    next();
  } catch (e) {
    console.error(e);
    res.json(unprocessableEntity({message:e.errors.join(",")}));
  }
};

export default requestValidator;








