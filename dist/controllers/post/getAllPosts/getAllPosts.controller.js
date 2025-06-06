"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _services_1 = require("../../../services/index.js");
const getAllPostsController = async (req, res, next) => {
    try {
        const { cursor } = req.query;
        const result = await _services_1.PostService.getAllPosts({ cursor });
        res.status(200).json({ posts: result });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getAllPostsController;
