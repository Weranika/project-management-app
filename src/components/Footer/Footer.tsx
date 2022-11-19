import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <a
        className="footer__rs-logo-link"
        href="https://rs.school/index.html"
        target="_blank"
        rel="noreferrer"
      >
        <div className="footer__rs-logo" />
      </a>
      <div className="footer__github-info">
        <a
          className="footer__github-link"
          href="https://github.com/Weranika"
          target="_blank"
          rel="noreferrer"
        >
          Weranika
        </a>
        <a
          className="footer__github-link"
          href="https://github.com/OxanaDanilova"
          target="_blank"
          rel="noreferrer"
        >
          oxanadanilova
        </a>
        <a
          className="footer__github-link"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
        >
          shishel-zaitcevich
        </a>
      </div>
      <p className="footer__year">2022</p>
    </footer>
  );
}

export default Footer;
