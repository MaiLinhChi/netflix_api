module.exports = (validator) => {
  return async (req, res, next) => {
    try {
      const validated = await validator.validateAsync({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      req.body = validated;
      next();
    } catch (err) {
      return res.status(422).json(err.message);
    }
  };
};
