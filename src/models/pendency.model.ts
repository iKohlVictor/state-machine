import { EPendencyState } from "../enums/e-pendency-state";
import { StateMachine } from "../interfaces/state-machine";
import { PendencyFlowService } from "../services/pendency-flow.service";
import { PendencyType } from "./pendency-type.model";

interface PendencyProps {
  state: EPendencyState | null;
  pendency_type: PendencyType;
  created_at: Date;
  updated_at: Date;
}

type pendencyID = number;

export class Pendency extends StateMachine<
  EPendencyState,
  pendencyID,
  PendencyProps
> {
  static create(pendency_type: PendencyType): Pendency {
    const pendency = new Pendency({
      pendency_type,
    });
    pendency.initialState();

    PendencyFlowService.validate(
      pendency,
      pendency.getProperties().pendency_type
    );

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
}
