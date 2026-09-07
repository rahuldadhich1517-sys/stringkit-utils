export interface TruncateOptions {
  /**
   * Text appended after truncation.
   * @default "..."
   */
  suffix?: string;

  /**
   * Whether truncation should happen at a word boundary.
   * @default true
   */
  preserveWords?: boolean;
}

const DEFAULT_OPTIONS: Required<TruncateOptions> = {
  suffix: "...",
  preserveWords: true,
};

/**
 * Truncates text to a maximum length.
 *
 * @example
 * truncate("This is a very long sentence", 20)
 * // "This is a very..."
 *
 * @example
 * truncate("This is a very long sentence", 20, {
 *   suffix: "..."
 * })
 * // "This is a very..."
 */
export function truncate(
  text: string,
  maxLength: number,
  options: TruncateOptions = {}
): string {
  if (typeof text !== "string") {
    throw new TypeError("truncate() expects a string");
  }

  if (!Number.isInteger(maxLength) || maxLength < 0) {
    throw new RangeError(
      "maxLength must be a non-negative integer"
    );
  }

  const config = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (text.length <= maxLength) {
    return text;
  }

  if (maxLength === 0) {
    return "";
  }

  if (config.suffix.length >= maxLength) {
    return config.suffix.slice(0, maxLength);
  }

  const availableLength = maxLength - config.suffix.length;

let truncated = text.slice(0, availableLength);

if (config.preserveWords) {
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > 0 && lastSpace < truncated.length) {
    truncated = truncated.slice(0, lastSpace);
  }
}

truncated = truncated.trimEnd();

return truncated + config.suffix;
}