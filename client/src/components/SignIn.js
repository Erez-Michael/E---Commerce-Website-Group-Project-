import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SignInContext } from "./contexts/SignInContext";


const SignIn = ({ email, setEmail, password, setPassword}) => {
    const {signInVerification} = useContext(SignInContext)
    
    const navigate = useNavigate()

    const handleSubmit = (e)=> {
        e.preventDefault()
        signInVerification(email, password)
        .then(res => { 
            res === true
            ? navigate("/")
            : alert("Unknown account.")})  
    }
    return ( 
        <Wrapper id="wrapper">
        <SignInBox id="signInBox">
          <Form onSubmit={handleSubmit}>
            <Title>Sign in</Title>
            <label htmlFor="email" id="email">
              <Input
                type="text"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </label>
            <label htmlFor="password" id="password">
              <Input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </label>
            <SignInButton onSubmit>Continue</SignInButton>
          </Form>
        </SignInBox>
      </Wrapper>
     );
}
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
font-family: var(--font);
height: calc(100vh - 132px);
`;
const SignInBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 300px;
height: 300px;
border-radius: 10px;
box-shadow: 0 0 20px 2px var(--color-grey);
padding: 20px;
background-color: white;
`;

const Title =styled.div`
font-size: 20px;
`
const Input = styled.input`
margin-top: 15px 0;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;
const SignInButton = styled.button`
color: white;
width: 100px;
border: none;
font-size: 16px;
cursor: pointer;
border-radius: 15px;
background-color: var(--color-dark-turquoise);
margin-top: 15px;
padding: 5px;
&:hover {
    background-color: var(--color-turquoise);
    color: var(--color-dark-grey);
}
`;
export default SignIn;