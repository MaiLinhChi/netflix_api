const List = require("../models/List");
const {
  checkDocumentExistWithFields,
  isObjectId,
} = require("../utils/checkParameter");

module.exports = {
  getAll: async (req, res) => {
    const typeQuery = req.query.type ? req.query.type : "";
    const genreQuery = req.query.genre
      ? req.query.genre.split(",").map((item) => item.trim())
      : [];
    let list = [];
    let condition = {};
    if (typeQuery) {
      condition.type = typeQuery;
    }

    if (genreQuery.length > 0) {
      condition.genre = { $elemMatch: { $in: genreQuery } };
    }
    try {
      list = await List.find(condition);
      return res.status(200).json(list);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  create: async (req, res) => {
    const listFields = ["title"];
    const document = await checkDocumentExistWithFields(
      List,
      null,
      listFields,
      req
    );
    if (document) return res.status(400).json("Title already existed.");
    const newList = new List(req.body);

    try {
      const savedList = await newList.save();
      return res.status(201).json(savedList);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    if (!isObjectId(req.params.id))
      return res.status(400).json("Id is not valid");
    const listFields = ["title"];
    const document = await checkDocumentExistWithFields(
      List,
      req.params.id,
      listFields,
      req
    );
    if (document) return res.status(400).json("Title already existed.");
    try {
      const updated = await List.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return updated
        ? res.status(200).json(updated)
        : res.status(404).json("List not found");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    if (!isObjectId(req.params.id))
      return res.status(400).json("Id is not valid");
    try {
      const deleted = await List.findByIdAndDelete(req.params.id);
      return deleted
        ? res.status(200).json(deleted)
        : res.status(404).json("List not found");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
