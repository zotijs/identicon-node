/**
 *
 * @param r red value
 * @param g green value
 * @param b blue value
 * @returns hex representation of the rgb values
 */
export const rgbToHex = (r: number, g: number, b: number) => {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${hex.padStart(6, "0")}`;
};
