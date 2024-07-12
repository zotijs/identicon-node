import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { rgbToHex, createIdenticon, createImage } from "./utilities";

/**
 * Extracts the needed arguments from the command line
 * @returns an object with the input and size
 */
const identiconConfig = (() => {
  const args = process.argv;

  if (!args.includes("-i")) {
    console.log("Input is required");
    process.exit(1);
  }

  const inputIndex = args.indexOf("-i");
  const input = inputIndex > 0 ? args[inputIndex + 1] ?? undefined : undefined;

  const sizeIndex = args.indexOf("-s");
  const size = sizeIndex > 0 ? args[sizeIndex + 1] ?? undefined : undefined;

  if (!!size && Number(size) > 5) {
    console.log("Size must be less than or equal to 5");
    process.exit(1);
  }

  return {
    input,
    size,
  };
})();

// create the hash from the input
const hash = createHash("sha256").update(identiconConfig.input!).digest("hex");

// convert the hash to a buffer
const binary = Buffer.from(hash, "hex");

// extract the rgb values from the buffer
const [r, g, b] = binary;

// size of the identicon
const size = identiconConfig?.size ? Number(identiconConfig.size) : 5;

// convert the rgb values to a hex color
const identiconColor = rgbToHex(r, g, b);
const identiconSquares = createIdenticon({ binary, size });

createImage(identiconColor, identiconSquares);
