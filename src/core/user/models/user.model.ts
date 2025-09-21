import { randomUUID } from "crypto";
import { Model } from "../../../shared/interfaces/model";

interface UserProps {
  name: string;
  created_at: Date;
  updated_at: Date;
  profile: "ADMIN" | "USER" | "CLIENT";
}

type UserID = string;

export class User extends Model<UserID, UserProps> {
  static create(props: Pick<UserProps, "name" | "profile">): User {
    const user = new User({
      name: props.name,
      profile: props.profile,
    });

    return user;
  }

  constructor(props: Pick<UserProps, "name" | "profile">, id?: string) {
    super(
      {
        created_at: new Date(),
        updated_at: new Date(),
        name: props.name,
        profile: props.profile,
      },
      id ?? randomUUID()
    );
  }
}
