import { OptionsService } from "@services";

import { GetOptionsHandler } from "./getOptions.controller.type";

const getOptionsController: GetOptionsHandler = async (req, res, next) => {
  try {
    const { type } = req.query;

    const options = await OptionsService.getOptions({ type });

    res.status(200).json({ options });
  } catch (error) {
    next(error);
  }
};

export default getOptionsController;
