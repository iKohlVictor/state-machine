export abstract class Model<Identify, Properties> {
  private readonly id: Identify | null;
  private readonly properties: Properties;

  constructor(props: Properties, id?: Identify) {
    this.id = id ?? null;
    this.properties = props;
  }

  getId(): Identify | null {
    return this.id;
  }

  getProperties(): Properties {
    return this.properties;
  }
}
