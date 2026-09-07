import { describe, expect, it } from "vitest";
import { slugify } from "../src/slugify";

describe("slugify", () => {
  it("converts text to a basic slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes leading and trailing separators", () => {
    expect(slugify("  Hello World  ")).toBe("hello-world");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("removes punctuation", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("handles special characters", () => {
    expect(slugify("Hello & World")).toBe("hello-world");
  });

  it("supports a custom separator", () => {
    expect(
      slugify("Hello World", { separator: "_" })
    ).toBe("hello_world");
  });

  it("handles accented characters", () => {
    expect(slugify("Café au lait")).toBe("cafe-au-lait");
  });

  it("handles empty strings", () => {
    expect(slugify("")).toBe("");
  });
});