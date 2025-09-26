import { Model } from "../../types/model";
import { UuidVO } from "../../types/uuid";

interface UserProps {
  name: string;
  created_at: Date;
  updated_at: Date;
  profile: "ADMIN" | "USER" | "CLIENT";
}

type UserID = UuidVO;

export class User extends Model<UserID, UserProps> {
  static create(props: Pick<UserProps, "name" | "profile">): User {
    const user = new User(
      {
        name: props.name,
        profile: props.profile,
      },
      UuidVO.create()
    );

    return user;
  }

  constructor(props: Pick<UserProps, "name" | "profile">, id?: UuidVO) {
    super(
      {
        created_at: new Date(),
        updated_at: new Date(),
        name: props.name,
        profile: props.profile,
      },
      id
    );
  }
}
