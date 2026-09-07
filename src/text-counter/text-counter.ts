/**
 * Counts words in a string.
 *
 * Words are separated by whitespace.
 *
 * @example
 * countWords("Hello world from StringKit")
 * // 4
 */
export function countWords(text: string): number {
  if (typeof text !== "string") {
    throw new TypeError("countWords() expects a string");
  }

  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/u).length;
}

/**
 * Counts characters in a string.
 *
 * Uses Array.from() so Unicode characters such as emoji
 * are counted as characters rather than UTF-16 code units.
 *
 * @example
 * countCharacters("Hello")
 * // 5
 */
export function countCharacters(text: string): number {
  if (typeof text !== "string") {
    throw new TypeError(
      "countCharacters() expects a string"
    );
  }

  return Array.from(text).length;
}

/**
 * Counts lines in a string.
 *
 * Supports:
 * - Unix: \n
 * - Windows: \r\n
 * - Old Mac: \r
 *
 * @example
 * countLines("Hello\nWorld")
 * // 2
 */
export function countLines(text: string): number {
  if (typeof text !== "string") {
    throw new TypeError("countLines() expects a string");
  }

  if (text === "") {
    return 0;
  }

  return text.split(/\r\n|\r|\n/u).length;
}