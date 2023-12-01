const ObjectID = require("mongodb").ObjectID;
const { httpErrors } = require("../configs");

module.exports = {
  checkDocumentExistWithFields: async (Model, id, fieldList, req) => {
    const document = await Model.findOne({
      $and: [
        id ? { _id: { $nin: [id || null] } } : {},
        { $or: fieldList.map((item) => ({ [item]: req.body[item] })) },
      ],
    });
    if (document) throw httpErrors.existedFields(fieldList);
  },
  isObjectId: (id) => {
    if (!ObjectID.isValid(id)) {
      throw httpErrors.objectId();
    }
  },
};
