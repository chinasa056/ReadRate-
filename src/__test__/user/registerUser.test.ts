import * as userController from "../../core/controllers/user";
import { User } from "../../core/models/users";
jest.mock('../core/models/users');

User.create = jest.fn();
const body = {
    username: "dan",
    email: "dan@gmail.com",
    password: "$2b$10$XvcCJYZTCtGX7.5IG/bgI.xofAgkPyxwEswMCQhKrWCqdocMTtaXC",
    phone: "08169918225",
    bio: "I am a cool, learned guy. I no like casala",
    image: "isaac.jpg"
};

describe("User model tests", () => {
  it("shoud have a processUserRegistration function", () => {
    expect(typeof userController.processUserRegistration).toBe("function");
  });

  it('should create a user', async () =>{
    jest.spyOn(User, 'create').mockResolvedValue(body);

    const result = await User.create(body);

    expect(result).toEqual(body);
  });

  it("should call User.create", async () => {
    userController.processUserRegistration(body);
    expect(User.create).toBeTruthy();
  });
});
