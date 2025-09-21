import { randomUUID } from "crypto";
import { ValueObject } from "./value-object";

interface UuidProps {
  value: string;
}

export class UuidVO extends ValueObject<UuidProps> {
  constructor(value: UuidProps) {
    super(value);
  }

  static create(): UuidVO {
    const uuid = new UuidVO({ value: randomUUID() });
    uuid.isValid();

    return uuid;
  }

  public getValue(): string {
    return this.props.value;
  }

  private isValid(): void {
    if (
      this.props.value === null ||
      this.props.value === undefined ||
      this.props.value.trim() === ""
    ) {
      throw new Error("Error ao criar o uuid");
    }
  }
}
