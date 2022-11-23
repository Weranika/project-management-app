import React from 'react';
import './Main.scss';
import { HashLink } from 'react-router-hash-link';
import { IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AboutUs from '../../AboutUs/AboutUs';
import { FormattedMessage } from 'react-intl';

const Main: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="start-page">
        <p id="head1" className="start-page__title"><FormattedMessage id='title1' /></p>
        <p id="head2" className="start-page__title"><FormattedMessage id='title2' /></p>
        <p id="head3" className="start-page__title"><FormattedMessage id='title3' /></p>
        <p id="head4" className="start-page__title"><FormattedMessage id='title4' /></p>
        <p id="head5" className="start-page__title"><FormattedMessage id='title5' /></p>
        <HashLink smooth to="/#about-us">
          <button className="start-page__button"><FormattedMessage id='about_us' /></button>
        </HashLink>
      </section>
      <AboutUs />
      <IconButton className="scroll-button__container scroll-up" onClick={scrollToTop}>
        <ExpandLessIcon />
      </IconButton>
      <div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </>
  );
};

export default Main;
