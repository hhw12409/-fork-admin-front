import { signin } from "@/store/slices/user/async/signin";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ColorList } from "Shared/globalStyle/theme/color";
import styled from "styled-components";
import _ from "lodash";
import { useDispatch } from "react-redux";

const Signin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignin = _.throttle(() => {
    dispatch(signin({ email, password }));
  }, 1000);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("지금은 전부 로그인 됩니다.");
    handleSignin();
  };
  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Image>
          <img src="/images/Logo.png" alt="로고" />
        </Image>
        <Input>
          <input
            type="text"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Input>
        <Input>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Input>
        <Submit type="submit">로그인 하기</Submit>
      </FormContainer>
      <Links>
        <Link to="/signup">회원가입 하기</Link>
      </Links>
    </Container>
  );
};

export default Signin;
const Container = styled.section`
  max-width: 400px;
  width: calc(100% - 50px);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.div`
  text-align: center;
  padding-bottom: 50px;
`;
const FormContainer = styled.form`
  width: 100%;
  background: ${ColorList.perfumeryPink};
  padding: 50px;
`;
const Input = styled.div`
  padding: 8px 12px;
  background: white;
  margin-bottom: 20px;
  input {
    background: none;
    border: 0;
    width: 100%;
  }
`;
const Submit = styled.button`
  width: 100%;
  height: 30px;
  background: ${ColorList.facebook500};
  color: #fff;
`;
const Links = styled.div`
  text-align: center;
  margin-top: 8px;
  a {
    text-decoration: none;
    color: ${ColorList.perfumeryPink};
    width: 100%;
  }
`;
