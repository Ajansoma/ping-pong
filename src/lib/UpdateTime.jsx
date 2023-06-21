let lastTime = 0;
export const updateTime = function (time) {
  const delta = time - lastTime;
  //upddate code
  lastTime = time;

  return {
    time: window.requestAnimationFrame(updateTime),
    delta,
  };
};

window.requestAnimationFrame(updateTime);
