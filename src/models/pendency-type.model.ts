import { EPendencyState } from "../enums/e-pendency-state";
import { FlowMachine } from "../interfaces/state-machine";

export interface PendencyTypeProps {
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  type: EPendencyTypes;
}

type PendencyTypeID = number;

export class PendencyType extends FlowMachine<
  EPendencyState,
  PendencyTypeID,
  PendencyTypeProps
> {
  private flow: Record<EPendencyTypes, EPendencyState[]> = {
    [EPendencyTypes.ADITIVO]: [EPendencyState.DONE],
    [EPendencyTypes.ASSINATURAS_COMPLETAS]: [
      EPendencyState.PENDENT,
      EPendencyState.DONE,
    ],
    [EPendencyTypes.PENHOR]: [
      EPendencyState.PENDENT,
      EPendencyState.PENDENT_VALIDATE,
      EPendencyState.DONE,
      EPendencyState.CANCELED,
    ],
    [EPendencyTypes.FIDUNCIARIA]: [
      EPendencyState.PENDENT,
      EPendencyState.PENDENT_VALIDATE,
      EPendencyState.DONE,
      EPendencyState.CANCELED,
    ],
  };

  static create(
    name: string,
    description: string | null,
    type: EPendencyTypes
  ): PendencyType {
    const pendencyType = new PendencyType({ name, description, type });
    pendencyType.validate();
    return pendencyType;
  }
  constructor(props: Pick<PendencyTypeProps, "name" | "description" | "type">) {
    super({
      name: props.name,
      description: props.description,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
      type: props.type,
    });
  }

  private validate(): void {
    if (
      this.getProperties().name === null ||
      this.getProperties().name === ""
    ) {
      throw new Error("Nome invalido");
    }
  }

  getNextState(actualState: EPendencyState): EPendencyState {
    const states = this.flow[this.getProperties().type];

    if (!states.includes(actualState)) {
      throw new Error("O estado atual não faz parte desse tipo de pendencia");
    }

    const currentIndex = states.indexOf(actualState);

    if (currentIndex === states.length - 1) {
      return actualState;
    }
    const nextState = states[currentIndex + 1];

    if (!nextState) {
      throw new Error("Não foi possivel encontrar o proximo estado");
    }

    return nextState;
  }
  getPreviousState(actualState: EPendencyState): EPendencyState {
    const states = this.flow[this.getProperties().type];

    if (!states.includes(actualState)) {
      throw new Error("O estado atual não faz parte desse tipo de pendencia");
    }

    const currentIndex = states.indexOf(actualState);

    if (currentIndex === 0) {
      return actualState;
    }

    const previousState = states[currentIndex - 1];

    if (!previousState) {
      throw new Error("Não foi possivel encontrar o estado anterior");
    }

    return previousState;
  }

  getFirstState(): EPendencyState | null {
    return this.flow[this.getProperties().type][0] ?? null;
  }
}

enum EPendencyTypes {
  ADITIVO = 1,
  ASSINATURAS_COMPLETAS = 2,
  PENHOR = 3,
  FIDUNCIARIA = 4,
}
