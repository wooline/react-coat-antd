import { enumValues } from "core/utils";
import { supervisor } from "core/entity/user.type";

export default {
  message: {
    saveSuccess: "保存成功！",
  },
  supervisor: {
    status: enumValues<supervisor.Status>(
      {
        all: "全部",
        active: "正常",
        disable: "禁用",
      },
      [supervisor.Status.all, supervisor.Status.active, supervisor.Status.disable],
    ),
  },
};
