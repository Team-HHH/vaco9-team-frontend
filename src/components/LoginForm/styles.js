import styled from 'styled-components';

export const LoginForm = {};

LoginForm.LoginFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  font-family: 'Nanum Barun Gothic';
`;

LoginForm.LoginFormSection = styled.form`
  flex: 1 0 auto;
  margin: 50px 42px;
`;

LoginForm.LoginTitle = styled.h2`
  margin-top: 32px;
  margin-bottom: 24px;
  color: rgb(33, 49, 60);
  font-size: 32px;
  line-height: 40px;
`;

LoginForm.Label = styled.label`
  color: ${props => props.theme.BOLD};
  padding: 15px;
`;

LoginForm.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  margin: 0px 0px 20px;
`;

LoginForm.LoginFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

LoginForm.LoginFooterTextAndLink = styled.div`
  display: flex;
  margin: 10px;
`;

LoginForm.LoginFooterText = styled.span`
  font-size: 14px;
  margin-right: 5px;
`;

LoginForm.LoginFooterLink = styled.a`
  text-decoration: none;

  &:visited {
    color: rgb(0, 124, 173);;
  }
`;

LoginForm.Input = styled.input`
  width: 270px;
  height: 20px;
  margin-bottom: 20px;
  padding: 12px 12px;
  font-size: 14px;
  border: 1px solid rgb(184, 196, 194);
  border-radius: 4px;
  outline: none;
  color: rgb(33, 49, 60);
  background-color: rgb(255, 255, 255);
`;

LoginForm.Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 10px;
  padding: 10px 15px;
  width: 25%;
  cursor: pointer;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.MAIN};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

LoginForm.Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;
