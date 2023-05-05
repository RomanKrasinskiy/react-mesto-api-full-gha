import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Register(props) {
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
    props.onRegister(registerFormValue.email, registerFormValue.password);
  };

  return (
    <div className="login-page">
      <Header navLinkName={props.navLinkName} navLink={props.navLink} />
      <section className="login">
        <h2 className="login__nameForm">Регистрация</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input login__input_type_email"
            placeholder="Email"
            type="email"
            name="email"
            value={registerFormValue.email}
            onChange={handleChange}
          />
          <input
            className="login__input login__input_type_password"
            placeholder="Password"
            type="password"
            name="password"
            value={registerFormValue.password}
            onChange={handleChange}
          />
          <button className="login__button" type="submit">
            Зарегистрироваться
          </button>
          <Link className="login__additional-question" to={"/sign-in"}>
            {" "}
            Уже зарегистрированы? Войти{" "}
          </Link>
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default Register;
