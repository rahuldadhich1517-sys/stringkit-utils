export interface RandomStringOptions {
  /**
   * Include lowercase letters.
   * @default true
   */
  lowercase?: boolean;

  /**
   * Include uppercase letters.
   * @default true
   */
  uppercase?: boolean;

  /**
   * Include numbers.
   * @default true
   */
  numbers?: boolean;

  /**
   * Include symbols.
   * @default false
   */
  symbols?: boolean;

  /**
   * Custom character set.
   *
   * When provided, it replaces all other character options.
   */
  customCharacters?: string;
}

const CHARACTER_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
} as const;

const DEFAULT_OPTIONS: Required<
  Omit<RandomStringOptions, "customCharacters">
> = {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false,
};

/**
 * Generates a cryptographically stronger random string.
 *
 * @example
 * randomString(12)
 * // "aK8xP2mQ9zLs"
 *
 * @example
 * randomString(10, {
 *   numbers: true,
 *   symbols: true
 * })
 */
export function randomString(
  length: number,
  options: RandomStringOptions = {}
): string {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError(
      "length must be a non-negative integer"
    );
  }

  if (length === 0) {
    return "";
  }

  const config = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const characters = getCharacters(config);

  if (characters.length === 0) {
    throw new Error(
      "At least one character set must be enabled"
    );
  }

  let result = "";

  const randomValues = new Uint32Array(length);
  getCrypto().getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    result += characters[randomValues[i] % characters.length];
  }

  return result;
}

function getCharacters(
  options: RandomStringOptions
): string {
  if (options.customCharacters !== undefined) {
    if (options.customCharacters.length === 0) {
      throw new Error(
        "customCharacters must not be empty"
      );
    }

    return options.customCharacters;
  }

  let characters = "";

  if (options.lowercase) {
    characters += CHARACTER_SETS.lowercase;
  }

  if (options.uppercase) {
    characters += CHARACTER_SETS.uppercase;
  }

  if (options.numbers) {
    characters += CHARACTER_SETS.numbers;
  }

  if (options.symbols) {
    characters += CHARACTER_SETS.symbols;
  }

  return characters;
}

function getCrypto(): Crypto {
  if (
    typeof globalThis.crypto === "undefined" ||
    typeof globalThis.crypto.getRandomValues !== "function"
  ) {
    throw new Error(
      "Secure random number generation is not available in this environment"
    );
  }

  return globalThis.crypto;
}