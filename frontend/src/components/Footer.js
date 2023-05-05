import React from "react";

function Footer() {
  return (
    <footer className="page__footer footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
