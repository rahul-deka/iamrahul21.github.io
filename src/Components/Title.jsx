import { useEffect, useRef } from 'react';
import './Title.css';
import gsap from 'gsap';

function randChar() {
  let chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨーラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
  const randomChar = chars[Math.floor(Math.random() * chars.length)];
  return Math.random() > 0.5 ? randomChar : randomChar.toUpperCase();
}

function Title() {
  const textRef = useRef(null);

  const triggerDecodingEffect = () => {
    const textElement = textRef.current;
    if (!textElement) return;

    const originalText = textElement.innerHTML.split('');
    let scrambledText = [...originalText].map(() => randChar());
    let revealedIndices = new Set();
    let step = 0;

    scrambledText = originalText.map(() => randChar());
    revealedIndices.clear();

    const tl = gsap.timeline({
      onUpdate: () => {
        const progress = Math.floor(tl.progress() * originalText.length);
        const unrevealedIndices = originalText
          .map((_, i) => i)
          .filter((i) => !revealedIndices.has(i));

        if (step !== progress || progress === 0) {
          step = progress;

          for (let i = 0; i < progress - revealedIndices.size; i++) {
            const randomIndex =
              unrevealedIndices[
                Math.floor(Math.random() * unrevealedIndices.length)
              ];
            revealedIndices.add(randomIndex);
          }

          const updatedText = originalText.map((char, i) =>
            revealedIndices.has(i) ? char : randChar()
          );

          textElement.innerHTML = updatedText.join('');
        }
      },
    });

    tl.to(textElement, {
      duration: originalText.length / 10,
      ease: 'power4.inOut',
      color: '#000',
      delay: 0.1,
    });
  };

  useEffect(() => {
    triggerDecodingEffect();
  }, []);

  return (
    <h1
      ref={textRef}
      className="codedText"
      onPointerOver={triggerDecodingEffect}
    >
      RAHUL DEKA
    </h1>
  );
}

export default Title;