import { createCanvas } from "canvas";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs";

const SQUARE_SIZE = 16;

/**
 * Creates an image from the identicon squares
 * @param color the color of the identicon filled squares
 * @param squares the squares that make up the identicon
 */
export const createImage = (color: string, squares: number[]) => {
  const size = Math.sqrt(squares.length);

  const canvas = createCanvas(size * SQUARE_SIZE, size * SQUARE_SIZE);

  const context = canvas.getContext("2d");

  context.fillStyle = color;

  squares.forEach((square, index) => {
    const x = (index % size) * SQUARE_SIZE;
    const y = Math.floor(index / size) * SQUARE_SIZE;

    if (square === 1) {
      context.fillRect(x, y, SQUARE_SIZE, SQUARE_SIZE);
    }
  });

  const fileName = `identicon-${randomUUID()}.png`;

  const imageBuffer = canvas.toBuffer("image/png");

  writeFile(`${process.cwd()}/output/${fileName}`, imageBuffer, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`Image saved as ${fileName} inside the /output folder`);
    }
  });
};
