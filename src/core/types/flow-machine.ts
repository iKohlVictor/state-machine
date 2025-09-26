import { Model } from "./model";

export abstract class FlowMachine<State, Identify, Properties> extends Model<
  Identify,
  Properties
> {
  abstract getNextState(actualState: State): State;
  abstract getPreviousState(actualState: State): State;
  abstract getFirstState(): State | null;
}
