const ObjectID = require("mongodb").ObjectID;

module.exports = {
  checkDocumentExistWithFields: async (Model, id, fieldList, req) => {
    return await Model.findOne({
      $and: [
        id ? { _id: { $nin: [id || null] } } : {},
        { $or: fieldList.map((item) => ({ [item]: req.body[item] })) },
      ],
    });
  },
  isObjectId: (id) => ObjectID.isValid(id),
};
