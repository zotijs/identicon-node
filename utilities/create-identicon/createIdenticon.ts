/**
 *
 * @param binary the Buffer that will generate the identicon
 * @param size x and y size of the identicon
 * @returns a two-dimensional array that represents the identicon's bits
 */
export const createIdenticon = ({
  binary,
  size,
}: {
  binary: Buffer;
  size: number;
}) => binary.subarray(0, size ** 2).map((byte) => (byte % 2 === 0 ? 0 : 1));
