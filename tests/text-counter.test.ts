import { describe, expect, it } from "vitest";
import {
  countWords,
  countCharacters,
  countLines,
} from "../src/text-counter";

describe("text-counter", () => {
  describe("countWords", () => {
    it("counts words", () => {
      expect(
        countWords("Hello world from StringKit")
      ).toBe(4);
    });

    it("handles multiple spaces", () => {
      expect(
        countWords("Hello    world   StringKit")
      ).toBe(3);
    });

    it("ignores leading and trailing whitespace", () => {
      expect(
        countWords("  Hello world  ")
      ).toBe(2);
    });

    it("handles new lines", () => {
      expect(
        countWords("Hello\nworld\nStringKit")
      ).toBe(3);
    });

    it("returns zero for empty text", () => {
      expect(countWords("")).toBe(0);
    });

    it("returns zero for whitespace-only text", () => {
      expect(countWords("   \n\t  ")).toBe(0);
    });
  });

  describe("countCharacters", () => {
    it("counts regular characters", () => {
      expect(countCharacters("Hello")).toBe(5);
    });

    it("counts spaces", () => {
      expect(countCharacters("Hello World")).toBe(11);
    });

    it("counts Unicode characters", () => {
      expect(countCharacters("café")).toBe(4);
    });

    it("handles emoji", () => {
      expect(countCharacters("😀")).toBe(1);
    });

    it("handles multiple emoji", () => {
      expect(countCharacters("😀🚀🔥")).toBe(3);
    });

    it("returns zero for empty text", () => {
      expect(countCharacters("")).toBe(0);
    });
  });

  describe("countLines", () => {
    it("counts Unix lines", () => {
      expect(
        countLines("Hello\nWorld\nStringKit")
      ).toBe(3);
    });

    it("supports Windows line endings", () => {
      expect(
        countLines("Hello\r\nWorld")
      ).toBe(2);
    });

    it("supports old Mac line endings", () => {
      expect(
        countLines("Hello\rWorld")
      ).toBe(2);
    });

    it("counts a single line", () => {
      expect(countLines("Hello World")).toBe(1);
    });

    it("returns zero for empty text", () => {
      expect(countLines("")).toBe(0);
    });
  });
});