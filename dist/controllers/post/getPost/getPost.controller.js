"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _services_1 = require("../../../services/index.js");
const getPostController = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const result = await _services_1.PostService.getPost({ postId });
        res.status(200).json({ post: result });
    }
    catch (error) {
        next(error);
    }
};
exports.default = getPostController;
