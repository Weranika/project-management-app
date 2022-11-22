import React from 'react';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import weranika from '../../assets/images/team/weranika.jpg';
import oxana from '../../assets/images/team/oxana.jpg';
import githubIcon from '../../assets/icons/Github_logo.png';
import './aboutUs.scss';

function AboutUs() {
  return (
    <section className="about-us" id={"about-us"}>
      <h2 className="our-team__title">ДАВАЙ ЗНАКОМИТЬСЯ</h2>
      <AnimationOnScroll
        animateIn='bounceInRight'
        animateOut='bounceOutLeft'
      >
        <article className="our-team__person">
          <img
            src={weranika}
            alt="weranika"
            className="person__img"
          />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                Weranika
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
            <h5 className="person__subtitle">Team leader, Frontend developer</h5>
            <p className="person__info">
              Тимлид команды. Определение единого дизайна приложения.
              Создание навигации и настройка роутинга.
              Вёрстка, адаптив и UI главной страницы.
            </p>
          </div>
        </article>
      </AnimationOnScroll>

      <AnimationOnScroll
        animateIn='bounceInLeft'
        animateOut='bounceOutRight'
      >
        <article className="our-team__person">
          <img
            src={oxana}
            alt="oxana"
            className="person__img"
          />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                Oxana
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
            <h5 className="person__subtitle">Frontend developer</h5>
            <p className="person__info">
              Oтвечала за server-client API, созданиеб удаление, обновление и отображение столбцов
            </p>
          </div>
        </article>
      </AnimationOnScroll>

      <AnimationOnScroll
        animateIn='bounceInRight'
        animateOut='bounceOutLeft'
      >
        <article className="our-team__person">
          <img
            src={oxana}
            alt="oxana"
            className="person__img"
          />
          <div className="person__content">
            <div className="person__title-container">
              <h3 className="person__title">
                Oxana
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
            <h5 className="person__subtitle">Frontend developer</h5>
            <p className="person__info">
              Oтвечала за server-client API, созданиеб удаление, обновление и отображение столбцов
            </p>
          </div>
        </article>
      </AnimationOnScroll>
    </section>
  );
}

export default AboutUs;
