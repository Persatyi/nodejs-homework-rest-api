/*
1. Принимает объект;
2. - ответ должен иметь статус-код 200;
   - в ответе должен возвращаться токен;
   - в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String;
3. Если получает некоректный тип данных - выьрасывает  ошибку с описанием что пошло не так.
*/

const mogoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

// const register = require("../controllers/auth/register");
const { default: mongoose } = require("mongoose");

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe("test register function", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mogoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection("users", () => {
      mongoose.connection.close(() => done());
    });
  });

  test("status - 201", async () => {
    const data = { email: "alex@mail.com", password: "qwerty" };
    const res = await request(app).post("/api/auth/users/signup").send(data);
    expect(res.statusCode).toBe(201);
  });

  test("status-200 while login", async () => {
    const hashPassword = await bcrypt.hash("123456", 10);
    const data = {
      password: hashPassword,
      email: "alex@mail.com",
      subscription: "starter",
      token: "",
      avatarURL: "//www.gravatar.com/avatar/2333d5725a7ff742d38ca85eb8fde610",
      verify: true,
      verificationToken: "qwert",
    };
    await User.create(data);

    const loginUser = { password: "123456", email: "alex@mail.com" };
    const res = await request(app)
      .post("/api/auth/users/login")
      .send(loginUser);
    expect(res.statusCode).toBe(200);
  });
});
