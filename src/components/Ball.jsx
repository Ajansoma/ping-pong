import { useState, useEffect, useRef } from 'react';
import { randomNumberBetween } from '../lib/randomNumberBetween';

const Ball = ({ onData }) => {
  const [delta, setDelta] = useState(0);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [direction, setDirection] = useState({ x: 0, y: null });
  const [velocity, setVelocity] = useState(0.025);
  const [lastTime, setLastTime] = useState(null);
  const [rect, setRect] = useState('');
  const containerRef = useRef(null);
  const VELOCITY_INCREASE = 0.00001;
  const [lostGame, setLostGame] = useState(false);

  useEffect(() => {
    if (Math.abs(direction.x) >= 0.2 || Math.abs(direction.x) <= 0.9) {
      const heading = randomNumberBetween(0, Math.PI * 2);
      setDirection({ x: Math.cos(heading), y: Math.sin(heading) });
    }
    window.requestAnimationFrame(updateTime);
  }, []);

  const updateTime = function (time) {
    setRect(containerRef.current.getBoundingClientRect());
    if (lastTime !== null) {
      setDelta(time - lastTime);

      // if (lostGame) {
      //   if (rect.right >= window.innerWidth) console.log('playerlose');
      //   else console.log('computerlost');
      // }
    }
    onData({ delta, y });
    setLastTime(time);

    setX((prevState) => (prevState += direction.x * velocity * delta));
    setY((prevState) => (prevState += direction.y * velocity * delta));

    if (rect.right >= window.innerWidth || rect.left <= 0) {
      setLostGame(true);
    }
  };
  window.requestAnimationFrame(updateTime);
  // console.log(velocity);

  useEffect(() => {
    return () => cancelAnimationFrame(updateTime);
  }, []);

  useEffect(() => {
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      setDirection((prevDirec) => ({
        ...prevDirec,
        y: -prevDirec.y,
      }));
      setVelocity((prevVel) => -prevVel);
    }
    if (rect.right >= window.innerWidth || rect.left <= 0) {
      setDirection((prevDirec) => ({
        ...prevDirec,
        x: -prevDirec.x,
      }));
      setVelocity((prevVel) => -prevVel);
    }
  }, [
    rect.right >= window.innerWidth,
    rect.left <= 0,
    rect.bottom >= window.innerHeight,
    rect.top <= 0,
  ]);

  return (
    <div
      className={`absolute -translate-y-[50%, 50%] h-[2.5vh] bg-cyan-100 w-[2.5vh] rounded-full`}
      style={{ 'top': `${x}vh`, 'left': `${y}vw` }}
      ref={containerRef}
    ></div>
  );
};

export default Ball;
