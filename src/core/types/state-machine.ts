import { Model } from "./model";

export abstract class StateMachine<State, Identify, Properties> extends Model<
  Identify,
  Properties
> {
  abstract getState(): State | null;
  abstract changeState(state: State): void;
}
