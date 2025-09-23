import { User } from "./user.model";

test("User test", () => {
  const name = "TEST 1";
  const user = User.create({
    name: name,
    profile: "ADMIN",
  });

  expect(user.getProperties().name).toBe(name);
  expect(user.getProperties().profile).toBe("ADMIN");
});
