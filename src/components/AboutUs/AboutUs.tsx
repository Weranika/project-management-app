import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { FormattedMessage } from 'react-intl';

import weranika from '../../assets/images/team/weranika.jpg';
import oxana from '../../assets/images/team/oxana.jpg';
import katerina from '../../assets/images/team/katerina.jpg';
import githubIcon from '../../assets/icons/Github_logo.png';
import './aboutUs.scss';

function AboutUs() {
  return (
    <section className="about-us" id={'about-us'}>
      <h2 className="our-team__title">
        <FormattedMessage id="our_team__title" />
      </h2>
      <AnimationOnScroll animateIn="bounceInRight" animateOut="bounceOutLeft">
        <article className="our-team__person">
          <img src={weranika} alt="weranika" className="person__img" />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                <FormattedMessage id="weranika" />
              </h3>
              <a
                className="person__github-link"
                href="https://github.com/Weranika"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={githubIcon}
                  alt="github icon"
                  className="person__github-link--icon"
                />
              </a>
            </div>
            <h5 className="person__subtitle">
              <FormattedMessage id="weranika__subtitle" />
            </h5>
            <p className="person__info">
              <FormattedMessage id="weranika__info" />
            </p>
          </div>
        </article>
      </AnimationOnScroll>

      <AnimationOnScroll animateIn="bounceInLeft" animateOut="bounceOutRight">
        <article className="our-team__person">
          <img src={oxana} alt="oxana" className="person__img" />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                <FormattedMessage id="oxana" />
              </h3>
              <a
                className="person__github-link"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={githubIcon}
                  alt="github icon"
                  className="person__github-link--icon"
                />
              </a>
            </div>
            <h5 className="person__subtitle">
              <FormattedMessage id="oxana__subtitle" />
            </h5>
            <p className="person__info">
              <FormattedMessage id="oxana__info" />
            </p>
          </div>
        </article>
      </AnimationOnScroll>

      <AnimationOnScroll animateIn="bounceInRight" animateOut="bounceOutLeft">
        <article className="our-team__person">
          <img src={katerina} alt="katerina" className="person__img" />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                <FormattedMessage id="katerina" />
              </h3>
              <a
                className="person__github-link"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={githubIcon}
                  alt="github icon"
                  className="person__github-link--icon"
                />
              </a>
            </div>
            <h5 className="person__subtitle">
              <FormattedMessage id="katerina__subtitle" />
            </h5>
            <p className="person__info">
              <FormattedMessage id="katerina__info" />
            </p>
          </div>
        </article>
      </AnimationOnScroll>
    </section>
  );
}

export default AboutUs;
