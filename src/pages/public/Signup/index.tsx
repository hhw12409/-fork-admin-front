import React, { FormEvent, useState } from "react";
import { ColorList } from "Shared/globalStyle/theme/color";
import styled from "styled-components";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { signup } from "@/store/slices/user/async/signup";
const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignup = _.throttle(() => {
    console.log("2")
    dispatch((signup({ email, name, password })));
  }, 1000);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("지금은 모두 회원가입 됩니다.")
    console.log("1")
    handleSignup();
    //여기서 스로틀링
  }
  return <Container>
    <h1>퍼퓨머리 회원가입</h1>

    <FormContainer onSubmit={handleSubmit}>
      <Image>
        <img src="/images/Logo.png" alt="로고" />
      </Image>
      <Input>
        <input type="text" placeholder="이메일을 입력해주세요" value={email} onChange={e => setEmail(e.target.value)} />
      </Input>
      <Input>
        <input type="text" placeholder="이름을 입력해주세요" value={name} onChange={e => setName(e.target.value)} />
      </Input>
      <Input>
        <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={e => setPassword(e.target.value)} />
      </Input>
      <Input>
        <input type="password" placeholder="비밀번호를 다시 입력해주세요" value={checkPassword} onChange={e => setCheckPassword(e.target.value)} />
      </Input>
      <Submit type="submit">회원가입하기</Submit>
    </FormContainer>
  </Container>

}

export default Signup

const Container = styled.section`
	max-width:400px;
	width:calc(100% - 50px);
	position:absolute;
	top:50%;
	left:50%;
	transform: translate(-50%,-50%);
  h1{
    text-align: center;
    margin-bottom:30px;
    font-size: 2rem;
  }
`;
const Image = styled.div`
	text-align: center;
	padding-bottom:50px;
`;
const FormContainer = styled.form`
	width:100%;
	background: ${ColorList.perfumeryPink};
	padding:50px;
`;
const Input = styled.div`
	padding:8px 12px;
	background: white;
	margin-bottom:20px;
	input{
		background: none;
		border: 0;
    width:100%;
	}
`;
const Submit = styled.button`
	width:100%;
	height:30px;
	background: ${ColorList.facebook500};
	color:#fff;
`;