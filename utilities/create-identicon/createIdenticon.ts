/**
 *
 * @param binary the Buffer that will generate the identicon
 * @param size x and y size of the identicon
 * @returns a flattened array that represents the identicon's bits
 */
export const createIdenticon = (
  binary: Buffer,
  rowSize = 5,
  identicon = [] as number[]
): number[] => {
  if (identicon.length === rowSize ** 2) return identicon;

  const start = Math.max(
    0,
    (identicon.length / rowSize) * Math.ceil(rowSize / 2)
  );

  const endFirstPart = start + Math.ceil(rowSize / 2);
  const endSecondPart = start + Math.floor(rowSize / 2);

  const result = [
    ...identicon,
    ...binary
      .subarray(start, endFirstPart)
      .map((byte) => (byte % 2 === 0 ? 1 : 0)),
    ...binary
      .subarray(start, endSecondPart)
      .reverse()
      .map((byte) => (byte % 2 === 0 ? 1 : 0)),
  ];

  return createIdenticon(binary, rowSize, result);
};
