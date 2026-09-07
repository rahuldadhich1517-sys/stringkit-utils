import { describe, expect, it } from "vitest";
import {
  randomString,
} from "../src/random-string";

describe("randomString", () => {
  it("generates a string with the requested length", () => {
    const result = randomString(20);

    expect(result).toHaveLength(20);
  });

  it("returns an empty string for length zero", () => {
    expect(randomString(0)).toBe("");
  });

  it("generates lowercase characters only", () => {
    const result = randomString(100, {
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    });

    expect(result).toMatch(/^[a-z]+$/);
  });

  it("generates uppercase characters only", () => {
    const result = randomString(100, {
      lowercase: false,
      uppercase: true,
      numbers: false,
      symbols: false,
    });

    expect(result).toMatch(/^[A-Z]+$/);
  });

  it("generates numbers only", () => {
    const result = randomString(100, {
      lowercase: false,
      uppercase: false,
      numbers: true,
      symbols: false,
    });

    expect(result).toMatch(/^[0-9]+$/);
  });

  it("supports custom characters", () => {
    const result = randomString(50, {
      customCharacters: "ABC123",
    });

    expect(result).toMatch(/^[ABC123]+$/);
  });

  it("throws when length is negative", () => {
    expect(() => randomString(-1)).toThrow(
      RangeError
    );
  });

  it("throws when length is not an integer", () => {
    expect(() => randomString(5.5)).toThrow(
      RangeError
    );
  });

  it("throws when all character sets are disabled", () => {
    expect(() =>
      randomString(10, {
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false,
      })
    ).toThrow();
  });

  it("generates different values across calls", () => {
  const first = randomString(32);
  const second = randomString(32);

  expect(first).not.toBe(second);
});

  it("throws for an empty custom character set", () => {
    expect(() =>
      randomString(10, {
        customCharacters: "",
      })
    ).toThrow();
  });
});