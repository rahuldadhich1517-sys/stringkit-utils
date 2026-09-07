import { describe, expect, it } from "vitest";
import {
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase,
} from "../src/case-converter";

describe("case-converter", () => {
  describe("camelCase", () => {
    it("converts words to camelCase", () => {
      expect(camelCase("hello world")).toBe("helloWorld");
    });

    it("handles kebab-case", () => {
      expect(camelCase("hello-world")).toBe("helloWorld");
    });

    it("handles snake_case", () => {
      expect(camelCase("hello_world")).toBe("helloWorld");
    });

    it("handles PascalCase", () => {
      expect(camelCase("HelloWorld")).toBe("helloWorld");
    });

    it("handles empty strings", () => {
      expect(camelCase("")).toBe("");
    });
  });

  describe("pascalCase", () => {
    it("converts words to PascalCase", () => {
      expect(pascalCase("hello world")).toBe("HelloWorld");
    });

    it("handles kebab-case", () => {
      expect(pascalCase("hello-world")).toBe("HelloWorld");
    });

    it("handles snake_case", () => {
      expect(pascalCase("hello_world")).toBe("HelloWorld");
    });
  });

  describe("snakeCase", () => {
    it("converts words to snake_case", () => {
      expect(snakeCase("Hello World")).toBe("hello_world");
    });

    it("handles kebab-case", () => {
      expect(snakeCase("hello-world")).toBe("hello_world");
    });
  });

  describe("kebabCase", () => {
    it("converts words to kebab-case", () => {
      expect(kebabCase("Hello World")).toBe("hello-world");
    });

    it("handles snake_case", () => {
      expect(kebabCase("hello_world")).toBe("hello-world");
    });
  });

  it("handles multiple spaces and special characters", () => {
    expect(camelCase("hello   world! test")).toBe(
      "helloWorldTest"
    );
  });

  it("handles acronyms", () => {
    expect(camelCase("XMLHttpRequest")).toBe(
      "xmlHttpRequest"
    );
  });
});