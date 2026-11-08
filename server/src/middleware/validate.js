// validate(zodSchema) -> replaces req.body with the parsed (cleaned) data
export const validate = (schema) => (req, _res, next) => {
  req.body = schema.parse(req.body);
  next();
};
