export interface MaskOptions {
  /**
   * Number of visible characters.
   * @default 4
   */
  visible?: number;

  /**
   * Where visible characters should remain.
   * @default "end"
   */
  position?: "start" | "end" | "both";

  /**
   * Character used for masking.
   * @default "*"
   */
  maskCharacter?: string;
}

const DEFAULT_OPTIONS: Required<MaskOptions> = {
  visible: 4,
  position: "end",
  maskCharacter: "*",
};

/**
 * Masks sensitive text while keeping selected characters visible.
 *
 * @example
 * mask("9876543210")
 * // "******3210"
 *
 * @example
 * mask("9876543210", { visible: 2 })
 * // "********32"
 *
 * @example
 * mask("9876543210", {
 *   visible: 2,
 *   position: "start"
 * })
 * // "98********"
 */
export function mask(
  text: string,
  options: MaskOptions = {}
): string {
  if (typeof text !== "string") {
    throw new TypeError("mask() expects a string");
  }

  const config = {
    ...DEFAULT_OPTIONS,
    ...options,
  };


  if (
  config.position !== "start" &&
  config.position !== "end" &&
  config.position !== "both"
) {
  throw new Error(
    'position must be one of "start", "end", or "both"'
  );
}

  if (
    !Number.isInteger(config.visible) ||
    config.visible < 0
  ) {
    throw new RangeError(
      "visible must be a non-negative integer"
    );
  }

  if (!config.maskCharacter) {
    throw new Error(
      "maskCharacter must not be empty"
    );
  }

  const characters = Array.from(text);

  if (characters.length === 0) {
    return "";
  }

  if (config.visible === 0) {
    return config.maskCharacter.repeat(characters.length);
  }

  if (config.position === "start") {
    return maskFromStart(characters, config.visible, config.maskCharacter);
  }

  if (config.position === "both") {
    return maskFromBoth(characters, config.visible, config.maskCharacter);
  }

  return maskFromEnd(characters, config.visible, config.maskCharacter);
}

function maskFromStart(
  characters: string[],
  visible: number,
  maskCharacter: string
): string {
  if (visible >= characters.length) {
    return characters.join("");
  }

  const visiblePart = characters
    .slice(0, visible)
    .join("");

  const maskedLength = characters.length - visible;

  return (
    visiblePart +
    maskCharacter.repeat(maskedLength)
  );
}

function maskFromEnd(
  characters: string[],
  visible: number,
  maskCharacter: string
): string {
  if (visible >= characters.length) {
    return characters.join("");
  }

  const visiblePart = characters
    .slice(-visible)
    .join("");

  const maskedLength = characters.length - visible;

  return (
    maskCharacter.repeat(maskedLength) +
    visiblePart
  );
}

function maskFromBoth(
  characters: string[],
  visible: number,
  maskCharacter: string
): string {
  if (visible * 2 >= characters.length) {
    return characters.join("");
  }

  const start = characters
    .slice(0, visible)
    .join("");

  const end = characters
    .slice(-visible)
    .join("");

  const maskedLength =
    characters.length - visible * 2;

  return (
    start +
    maskCharacter.repeat(maskedLength) +
    end
  );
}