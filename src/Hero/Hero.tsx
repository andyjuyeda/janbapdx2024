import styles from "./hero.module.css";
import Rellax from "rellax";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    new Rellax(".rellax");

    const bouncingArrowSVG = document.querySelector("#bouncingArrow svg");

    if (bouncingArrowSVG) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // Target the parent element (the <a> tag)
            const parentElement = bouncingArrowSVG.parentNode;

            // Ensure the parent element is of the correct type
            if (parentElement instanceof HTMLElement) {
              parentElement.classList.add("hidden");
            }

            observer.unobserve(bouncingArrowSVG);
          }
        });
      });

      observer.observe(bouncingArrowSVG);
    }
  });
  return (
    <div className={styles.hero}>
      <a href="#information" id="bouncingArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute bottom-10 left-0 right-0 z-10 mx-auto h-10 w-10 animate-bounce text-slate-50 opacity-80"
        >
          <path
            fillRule="evenodd"
            d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <div className={styles.heroImages}>
        <img
          src="src/assets/sky.png"
          alt="sky"
          className={`${styles.heroImg} rellax`}
          data-rellax-speed="-12"
        />
        <img
          src="src/assets/mountain-peak.png"
          alt="mountain-peak"
          className={`${styles.heroImg} rellax`}
          data-rellax-speed="-12"
        />
        <img
          src="src/assets/janba-logo-text-only.png"
          alt="JANBA logo text only"
          className={`${styles.heroImg} rellax ${styles.logo}`}
          data-rellax-speed="-12"
        />
        <img
          src="src/assets/mountain-base.png"
          alt="mountain-base"
          className={`${styles.heroImg} rellax`}
          data-rellax-speed="-8"
        />
        <img
          src="src/assets/field.png"
          alt="field"
          className={`${styles.heroImg} rellax`}
          data-rellax-speed="-6"
        />
        <img
          src="src/assets/tree-blue.png"
          alt="tree-blue"
          className={`${styles.heroImg} rellax`}
          data-rellax-speed="-4"
        />
        <img
          src="src/assets/tree-dark.png"
          alt="treedark"
          className={styles.heroImg}
        />
      </div>
    </div>
  );
}
