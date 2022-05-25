import { Canvas, createCanvas } from 'canvas';

/**
 * This class contains everything needed for generate captcha png
 */
export class CaptchaCanvasDesign {
  /**
   * this property is the canvas that's used for design the chapta
   * @type {Canvas}
   * @private
   */
  private canvas: Canvas;

  /**
   *
   * @param {number} height this property define the height of png
   * @param {number} width this property define the width of png
   */
  constructor(private readonly height: number, private readonly width: number) {
    this.canvas = createCanvas(this.width, this.height);
  }

  /**
   * generate the captcha from given string and return it as png data url
   * @param {string} str this are the captcha characters
   * @returns {string} png as data url encoded
   */
  generateForDataUrl(str: string): string {
    this.writeChars(str);
    this.writeStrokes();
    this.writeScribbles();
    return this.canvas.toDataURL();
  }

  /**
   * generate random rgb color
   * @private
   * @returns {string}
   */
  private static randomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  /**
   * this is the function that write the characters string into canvas
   * @param {string} str
   * @private
   * @returns {void}
   */
  private writeChars(str: string): void {
    const context = this.canvas.getContext('2d');
    for (let i = 0; i < str.length; i++) {
      const sDeg = (Math.random() * 30 * Math.PI) / 180;
      const x = 10 + i * 20;
      const y = 20 + Math.random() * 8;
      context.font = 'bold 23px 微软雅黑';
      context.translate(x, y);
      context.rotate(sDeg);

      context.fillStyle = CaptchaCanvasDesign.randomColor();
      context.fillText(str[i], 0, 0);

      context.rotate(-sDeg);
      context.translate(-x, -y);
    }
  }

  /**
   * this is the function that write strokes lines into canvas
   * @param {number} count default is set to 3 and is the number of lines
   * @private
   * @returns {void}
   */
  private writeStrokes(count = 5): void {
    const context = this.canvas.getContext('2d');

    for (let i = 0; i <= count; i++) {
      context.strokeStyle = CaptchaCanvasDesign.randomColor();
      context.beginPath();
      context.moveTo(Math.random() * this.width, Math.random() * this.height);
      context.lineTo(Math.random() * this.width, Math.random() * this.height);
      context.stroke();
    }
  }

  /**
   * this is the function that put scribble into canvas
   * @param {number} count number of artifacts
   * @private
   * @returns {void}
   */
  private writeScribbles(count = 30): void {
    const context = this.canvas.getContext('2d');
    for (let i = 0; i < count; i++) {
      context.strokeStyle = CaptchaCanvasDesign.randomColor();
      context.beginPath();
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      context.moveTo(x, y);
      context.lineTo(x + 1, y + 1);
      context.stroke();
    }
  }
}
