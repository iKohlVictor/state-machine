import { EPendencyTypes } from "./core/pendency/enums/e-pendency-types";
import { PendencyType } from "./core/pendency/models/pendency-type.model";
import { Pendency } from "./core/pendency/models/pendency.model";
import { PendencyFlowService } from "./core/pendency/services/pendency-flow.service";

const pendencyType = PendencyType.create(
  "Pendência de teste",
  null,
  EPendencyTypes.PENHOR
);

console.log("Tipo de Pendência criada com sucesso.", pendencyType);

const pendency = Pendency.create(pendencyType);
console.log("Pendência criada com sucesso.", pendency);
PendencyFlowService.next(pendency, pendencyType);
console.log("Proximo estado", pendency.getState());
