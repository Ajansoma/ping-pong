import { useEffect } from 'react';
import { useState, useRef } from 'react';
import Ball from './Ball';

const GameUI = () => {
  const [positionPlayer, setPositionPlayer] = useState(50);
  const [positionComputer, setPositionComputer] = useState(50);
  const [score] = useState([0, 0]);
  const SPEED = 0.025;

  const handlePlayerMoving = function (e) {
    setPositionPlayer((e.clientY / window.innerHeight) * 100);
  };

  const handleComputerMoving = function (data) {
    const speed = SPEED * data.delta;
    setPositionComputer(
      (prevState) => (prevState += speed * (data.y - prevState))
    );
  };

  return (
    <section className="h-screen bg-cyan-600 relative overflow-hidden">
      <div className="flex text-[40px] sm:text-[70px] sm:leading-[40px] text-cyan-900 opacity-60 justify-center gap-5 pt-6">
        <p className="text-right"> {score[0]}</p>
        <p> | </p>
        <p className="text-right">{score[1]}</p>
      </div>
      <div
        className={`absolute left-[1vw]  h-[10vh] bg-cyan-100 w-[1vh] -translate-y-[50%] cursor-pointer`}
        style={{ 'top': `${positionPlayer}vh` }}
        onMouseMove={handlePlayerMoving}
      ></div>
      <div
        className={`absolute right-[1vw]  h-[10vh] bg-cyan-100 w-[1vh] -translate-y-[50%] cursor-pointer`}
        style={{ 'top': `${positionComputer}vh` }}
      ></div>
      <Ball onData={handleComputerMoving} />
      {/* <Ball /> */}
    </section>
  );
};

export default GameUI;
