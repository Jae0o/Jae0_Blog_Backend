import { OPTIONS_TYPE_LIST } from "@constants";

import { OptionsService } from "@services";

import { GetOptionsHandler } from "./options.type";

const getOptions: GetOptionsHandler = async (req, res, next) => {
  try {
    const { type } = req.params;

    if (!OPTIONS_TYPE_LIST.includes(type)) {
      throw new Error("Invalid type");
    }

    const list = await OptionsService.getOptions({ type });

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

const PostController = {
  getOptions,
};

export default PostController;
