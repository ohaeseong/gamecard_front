import { createAccount, login } from "@/apis/account";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { setCookie } from "@/hooks/cookie";
import { IResponseLogin } from "@/types/Account";
import classNames from "classnames";
import React from "react";
import { useRouter } from "next/router";

const LoginContainer: React.FC = ({}) => {
  const [id, setId] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [comfirmPw, setComfirmPw] = React.useState("");

  const [regist, setRegist] = React.useState(false);

  const router = useRouter();

  return (
    <div
      className={classNames(
        "p-20 rounded w-fit h-fit bg-white flex flex-col items-center justify-center shadow-lg"
      )}
    >
      <h1 className="mb-8 font-bold text-lg">GAMECARD</h1>

      {!regist ? (
        <div className="space-y-3">
          <Input placeholder="ID" onChange={handleId} value={id} />
          <Input
            placeholder="PW"
            onChange={handlePw}
            value={pw}
            type="password"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <Input placeholder="ID" onChange={handleId} value={id} />
          <Input
            placeholder="PW"
            onChange={handlePw}
            value={pw}
            type="password"
          />
          <Input
            placeholder="Confirm PW"
            onChange={handleComfirmPw}
            value={comfirmPw}
            type="password"
          />
        </div>
      )}

      <div className="w-full mt-8">
        {!regist ? (
          <Button className="w-full h-10" onClick={onLogin}>
            Login
          </Button>
        ) : (
          <Button className="w-full h-10" onClick={onRegist}>
            Regist
          </Button>
        )}
      </div>

      <div className="w-full flex justify-between mt-3">
        <span
          className="text-xs text-slate-400 cursor-pointer"
          onClick={() => router.push("/")}
        >
          홈으로
        </span>
        {!regist ? (
          <span
            className="text-xs text-slate-400 cursor-pointer"
            onClick={toggleRegist}
          >
            회원가입 하기
          </span>
        ) : (
          <span
            className="text-xs text-slate-400 cursor-pointer"
            onClick={toggleRegist}
          >
            로그인 하기
          </span>
        )}
      </div>
    </div>
  );

  function toggleRegist() {
    setId("");
    setPw("");
    setRegist(!regist);
  }

  async function onLogin() {
    if (!id || !pw) {
      window.alert("양식을 확인해 주세요!");
      return;
    }

    const response: IResponseLogin = await login({ id, pw });

    if (response?.Err === "NotExistUser") {
      window.alert("아이디 혹은 비밀번호를 확인해주세요!");
      return;
    }
    const { authToken } = response;
    setCookie("authToken", authToken);
    setCookie("userId", id);

    router.push("/");
  }

  async function onRegist() {
    if (!id || !pw || !comfirmPw) {
      window.alert("양식을 확인해 주세요!");
      return;
    }

    if (pw !== comfirmPw) {
      window.alert("비밀번호가 같지 않아요!");
      return;
    }

    const response: IResponseLogin = await createAccount({ id, pw });

    if (response?.Err === "existnick") {
      window.alert("이미 등록된 ID에요!");
      return;
    }

    const { authToken } = response;

    setCookie("authToken", authToken);
    setCookie("userId", id);

    router.push("/");
  }

  function handleId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value);
  }

  function handlePw(e: React.ChangeEvent<HTMLInputElement>) {
    setPw(e.target.value);
  }

  function handleComfirmPw(e: React.ChangeEvent<HTMLInputElement>) {
    setComfirmPw(e.target.value);
  }
};

export default LoginContainer;
