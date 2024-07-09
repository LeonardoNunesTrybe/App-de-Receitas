import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); //* 1 -veja o final do codigo

  const submit = (click) => {
    click.preventDefault();

    const user = { email }; // cirando a constante user para salva no formato q a tribe pede do email { email: email-da-pessoa }
    localStorage.setItem('user', JSON.stringify(user)); // transformado em string para usar no localStorage , já que user é um objeto
    history.push('/meals');
  };

  const testEmail = () => {
    const regex = /[A-Za-z0-9]+@[A-Za-z]+\.com/;
    console.log(regex.test(email));
    console.log(email);
    return regex.test(email);
  };

  const testPassword = () => {
    const min = 7;
    return password.length >= min;
  };

  return (
    <div>
      <p className="login-text">Login</p>
      {/* <label htmlFor="email">Email:</label> */}
      <input
        className="login-input"
        data-testid="email-input"
        value={ email }
        onChange={ (event) => setEmail(event.target.value) }
        type="email"
        placeholder="Email"
      />
      {/* <label htmlFor="password">Senha:</label> */}
      <input
        className="login-input"
        data-testid="password-input"
        value={ password }
        onChange={ (event) => setPassword(event.target.value) }
        type="password"
        placeholder="Password"
      />
      <button
        className="login-btn"
        data-testid="login-submit-btn"
        disabled={ !testEmail() || !testPassword() }
        onClick={ submit }
        type="button"
      >
        Enter
      </button>
    </div>
  );
}

export default Login;

// Anotações Uteis :

// 1- utilizando o Hook useHistory vc pode aplicar um .push mais facil:
// Primeiro declare ele no inicio da função:

// const history = useHistory();

// Depois é só chamar o history.push onde quer , no caso no botão apos o Localstorage():

// const submit = (click) => {
//     click.preventDefault();
//     const user = { email };
//     localStorage.setItem('user', JSON.stringify(user));
//     history.push('/meals'); <<=======
//   };
