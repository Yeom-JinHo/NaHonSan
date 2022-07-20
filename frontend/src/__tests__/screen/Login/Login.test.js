import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, screen } from "@testing-library/react";
import renderWithProviders from "@utils/test-utils";
import userEvent from "@testing-library/user-event";
import Login from "@screens/Login/Login";
import { createMemoryHistory } from "history";
import { wait } from "@testing-library/user-event/dist/utils";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import App from "@app";
import Join from "@screens/Join/Join";

const handlers = [
  rest.post("/login", (req, res, ctx) => {
    if (req.body.id === "ssafy" && req.body.password === "ssafy") {
      return res(ctx.json("SUCCESS"), ctx.delay(10));
    }
    return res(ctx.json("JOINED"), ctx.delay(10));
  })
];
const server = setupServer(...handlers);

describe("로그인페이지", () => {
  let idInput;
  let passwordInput;
  let loginBtn;
  const history = createMemoryHistory();
  beforeEach(() => {
    server.listen();
    renderWithProviders(
      <MemoryRouter history={history}>
        <Login />
      </MemoryRouter>
    );
    idInput = screen.getByPlaceholderText("이메일을 입력해주세요");
    passwordInput = screen.getByPlaceholderText("비밀번호를 입력해주세요");
    loginBtn = screen.getByText("로그인");
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test("로그인 (아무것도입력 X)", () => {
    screen.getByText("로그인");
    userEvent.click(loginBtn);
    screen.getByText("아이디를 입력해주세요.");
    expect(idInput).toHaveFocus();
  });

  test("로그인 (아이디만 입력)", () => {
    screen.getByText("로그인");
    userEvent.type(idInput, "ssafy");
    userEvent.click(loginBtn);
    screen.getByText("비밀번호를 입력해주세요.");
    expect(passwordInput).toHaveFocus();
  });

  test("로그인 (비밀번호만 입력)", () => {
    userEvent.type(passwordInput, "ssafy");
    userEvent.click(loginBtn);
    screen.getByText("아이디를 입력해주세요.");
    expect(idInput).toHaveFocus();
  });

  // test("로그인 성공", () => {
  //   userEvent.type(idInput, "ssafy");
  //   userEvent.type(passwordInput, "ssafy");
  //   userEvent.click(loginBtn);
  //   expect(history.location.pathname).toBe("/4");
  // });

  test("로그인 실패", async () => {
    userEvent.type(idInput, "ssafy1");
    userEvent.type(passwordInput, "ssafy1234");
    userEvent.click(loginBtn);

    await screen.findByText("아이디 또는 비밀번호가 일치하지 않습니다.");
  });

  // test("회원가입 라우팅", async () => {
  //   history.push = jest.fn();
  //   const joinBtn = screen.getByText("회원가입");
  //   userEvent.click(joinBtn);
  //   // expect(history.location.pathname).toBe("/4");
  //   // expect(history.location.pathname).toBe("join");
  //   // expect(history.push).toHaveBeenCalledTimes(1);
  //   // await screen.findByText("404");
  //   // expect(history.push).toHaveBeenCalledWith();
  // });
});
