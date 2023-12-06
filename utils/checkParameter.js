var mongodb = require("mongodb");
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
  isObjectId: (arrayOfIDs) => {
    const isValid = arrayOfIDs.every((id) => mongodb.ObjectId.isValid(id));
    if (!isValid) {
      throw httpErrors.objectId();
    }
  },
};
