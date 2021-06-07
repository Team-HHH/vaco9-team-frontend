import styled from 'styled-components';

export const RegisterForm = {};

RegisterForm.RegisterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Nanum Barun Gothic';
`;

RegisterForm.FormWrapper = styled.div`
  height: 80vh;
  width: 300px;
`;

RegisterForm.Label = styled.label`
  color: ${props => props.theme.BOLD};
  margin: 3px;
`;

RegisterForm.Input = styled.input`
  display: block;
  border: none;
	padding: 8px 15px;
  margin: 5px 0 20px 0;
	width: 100%;
  border-radius: 5px;
  background-color: #eee;
`;

RegisterForm.Button = styled.input`
  margin: 20px 0;
  border: none;
  border-radius: 18px;
  padding: 10px 15px;
  width: 40%;
  background-color: ${props => props.theme.SUB};
  &:hover {
    background-color: ${props => props.theme.MAIN};
    color: black;
  }
  &:focus {
    outline: none;
  }
`;

RegisterForm.Message = styled.p`
  margin: 0;
  font-size: 10px;
  color: red;
`;
