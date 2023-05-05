import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function Login(props) {
  const [registerFormValue, setRegisterFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterFormValue({
      ...registerFormValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(registerFormValue.email, registerFormValue.password);
  };
  return (
    <div className="login-page">
      <Header navLinkName={props.navLinkName} navLink={props.navLink} />
      <section className="login">
        <h2 className="login__nameForm">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input login__input_type_email"
            placeholder="Email"
            type="email"
            name="email"
            value={registerFormValue.email}
            onChange={handleChange}
            required
          />
          <input
            className="login__input login__input_type_password"
            placeholder="Password"
            type="password"
            name="password"
            value={registerFormValue.password}
            onChange={handleChange}
            required
          />
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Login;
