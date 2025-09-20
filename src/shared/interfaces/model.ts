export abstract class Model<Identify, Properties> {
  private readonly id?: Identify;
  private readonly properties: Properties;

  constructor(data: Properties) {
    this.properties = data;
  }

  getId(): Identify | undefined {
    return this.id;
  }

  getProperties(): Properties {
    return this.properties;
  }
}
