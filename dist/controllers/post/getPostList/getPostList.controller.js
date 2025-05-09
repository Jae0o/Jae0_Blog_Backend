"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _services_1 = require("../../../services/index.js");
const getPostListController = async (req, res, next) => {
    try {
        const { category } = req.query;
        const result = await _services_1.PostService.getPostList({ category });
        res.status(200).json({ posts: result });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getPostListController;
