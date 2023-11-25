module.exports = (validator) => {
  return async (req, res, next) => {
    try {
      const validated = await validator.validateAsync({
        ...req.params,
        ...req.query,
        ...req.body,
      });
      req.body = validated;
      next();
    } catch (err) {
      return res.status(422).json(err.message);
    }
  };
};
