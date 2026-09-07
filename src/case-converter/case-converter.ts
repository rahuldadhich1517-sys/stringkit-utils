function tokenize(value: string): string[] {
  return value
    .trim()
    .replace(/([a-z\d])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-]+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

/**
 * Converts text to camelCase.
 *
 * @example
 * camelCase("hello world")
 * // "helloWorld"
 */
export function camelCase(value: string): string {
  const words = tokenize(value);

  if (words.length === 0) {
    return "";
  }

  return (
    words[0] +
    words
      .slice(1)
      .map((word) => capitalize(word))
      .join("")
  );
}

/**
 * Converts text to PascalCase.
 *
 * @example
 * pascalCase("hello world")
 * // "HelloWorld"
 */
export function pascalCase(value: string): string {
  return tokenize(value)
    .map(capitalize)
    .join("");
}

/**
 * Converts text to snake_case.
 *
 * @example
 * snakeCase("hello world")
 * // "hello_world"
 */
export function snakeCase(value: string): string {
  return tokenize(value).join("_");
}

/**
 * Converts text to kebab-case.
 *
 * @example
 * kebabCase("hello world")
 * // "hello-world"
 */
export function kebabCase(value: string): string {
  return tokenize(value).join("-");
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}