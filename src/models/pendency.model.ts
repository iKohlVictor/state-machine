import { EPendencyState } from "../enums/e-pendency-state";
import { StateMachine } from "../interfaces/state-machine";
import { PendencyType, PendencyTypeProps } from "./pendency-type.model";

interface PendencyProps {
  state: EPendencyState | null;
  pendency_type: PendencyTypeProps;
  created_at: Date;
  updated_at: Date;
}

type pendencyID = number;

export class Pendency extends StateMachine<
  EPendencyState,
  pendencyID,
  PendencyProps
> {
  static create(pendency_type: PendencyTypeProps): Pendency {
    const pendency = new Pendency({
      pendency_type,
    });
    pendency.initialState();
    pendency.validate();
    return pendency;
  }

  constructor(props: Pick<PendencyProps, "pendency_type">) {
    super({
      created_at: new Date(),
      updated_at: new Date(),
      pendency_type: props.pendency_type,
      state: null,
    });
  }

  getPreviousState(): EPendencyState | null {
    throw new Error("Method not implemented.");
  }
  getFirstState(): EPendencyState | null {
    return EPendencyState.PENDENT;
  }
  getState(): EPendencyState | null {
    return this.getProperties().state;
  }
  changeState(state: EPendencyState): void {
    this.getProperties().state = state;
    this.getProperties().updated_at = new Date();
  }
  initialState(): void {
    this.getProperties().state = EPendencyState.PENDENT;
  }

  private validate(): void {
    if (this.getState === null) {
      throw new Error("Está pendencia ainda não teve seu estado inicializado");
    }
    if (this.getState() !== this.getFirstState()) {
      throw new Error("Está pendencia foi criada com o estado corrompido");
    }
  }
}
