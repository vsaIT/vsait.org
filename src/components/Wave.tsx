import { useEffect, useRef } from 'react';

const Wave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (canvas && context) {
      const h = canvas.height,
        w = canvas.width;
      const waves = [
        {
          x: 1,
          dx: 1,
          y: 0.002,
          dy: 0,
          color: 'rgba(255,255,255,0.4)',
        },
        {
          x: 1,
          dx: 0.5,
          y: 0.002,
          dy: 0,
          color: 'rgba(255,255,255,0.6)',
        },
        {
          x: 1,
          dx: 0.1,
          y: 0.002,
          dy: 0,
          color: 'rgba(255,255,255,1)',
        },
      ];
      const drawWave = (
        ctx: CanvasRenderingContext2D,
        xOffset: number,
        yOffset: number,
        color: string
      ) => {
        let x = 0,
          y = 0;
        const a = 17,
          f = 45;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = color;
        while (x < w + 10) {
          y = h / 2 - yOffset + a * Math.sin((x + xOffset) / f);
          ctx.lineTo(x, y);
          x += 1;
        }
        ctx.lineTo(x, 200);
        ctx.lineTo(0, 200);
        ctx.fill();
      };

      let t = 0;
      const tm = 90;
      const draw = () => {
        context.clearRect(0, 0, w, h);
        context.save();
        context.translate(0, 15);
        for (let l = waves.length - 1, i = l; i >= 0; i--) {
          const w = waves[i];
          drawWave(context, w.x, w.y, w.color);
          w.x += w.dx;
        }
        if (t >= tm) {
          t = 0;
          for (let l = waves.length - 1, i = l; i >= 0; i--) {
            const w = waves[i];
            if (w.y > 1) {
              w.y = 1 - w.dy;
            } else {
              w.y = 1 + w.dy;
            }
          }
        }
        context.restore();
        t++;
        window.requestAnimationFrame(draw);
      };
      draw();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className='absolute bottom-0 flex h-52 w-full'
    ></canvas>
  );
};
export default Wave;
