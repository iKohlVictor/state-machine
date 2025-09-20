import { Model } from "./model.ts";

export abstract class StateMachine<State, Identify, Properties> extends Model<
  Identify,
  Properties
> {
  protected abstract getState(): State | null;
  protected abstract changeState(state: State): void;
  protected abstract initialState(): void;
}

export abstract class FlowMachine<State, Identify, Properties> extends Model<
  Identify,
  Properties
> {
  protected abstract getNextState(actualState: State): State;
  protected abstract getPreviousState(actualState: State): State;
  protected abstract getFirstState(): State | null;
}
