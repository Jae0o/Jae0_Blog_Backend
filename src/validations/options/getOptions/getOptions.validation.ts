import { BlogErrorStatus, BlogStatusCode, OptionsType } from "@interfaces";

import { GetOptionsValidation } from "./getOptions.validation.type";

const getOptionsValidation: GetOptionsValidation = (req, res, next) => {
  const { type } = req.query;

  if (!type) {
    res
      .status(BlogStatusCode.NOT_FULFILLED)
      .json({ code: BlogErrorStatus.GET_OPTIONS_NO_TYPE });
    return;
  }

  const OPTIONS_TYPE_LIST = Object.values(OptionsType);
  if (!OPTIONS_TYPE_LIST.includes(type)) {
    res
      .status(BlogStatusCode.BAD_REQUEST)
      .json({ code: BlogErrorStatus.GET_OPTIONS_TYPE_NOT_INVALID });

    return;
  }

  next();
};

export default getOptionsValidation;
