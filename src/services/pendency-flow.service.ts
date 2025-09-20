import { PendencyType } from "../models/pendency-type.model";
import { Pendency } from "../models/pendency.model";

export class PendencyFlowService {
  static validate(pendency: Pendency, type: PendencyType): void {
    if (pendency.getState() === null) {
      throw new Error("Pendência não inicializada");
    }
    if (pendency.getState() !== type.getFirstState()) {
      throw new Error("Pendência criada em estado incorreto");
    }
  }

  static next(pendency: Pendency, type: PendencyType): void {
    const next = type.getNextState(pendency.getState()!);
    pendency.changeState(next);
  }

  static previous(pendency: Pendency, type: PendencyType): void {
    const prev = type.getPreviousState(pendency.getState()!);
    pendency.changeState(prev);
  }
}
