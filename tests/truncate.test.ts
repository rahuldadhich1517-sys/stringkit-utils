import { describe, expect, it } from "vitest";
import { truncate } from "../src/truncate";

describe("truncate", () => {
    it("returns the original text when within the limit", () => {
        expect(truncate("Hello world", 20)).toBe(
            "Hello world"
        );
    });

    it("truncates long text", () => {
        expect(
            truncate("This is a very long sentence", 20)
        ).toBe("This is a very...");
    });

    it("preserves word boundaries by default", () => {
        expect(
            truncate("Hello wonderful world", 15)
        ).toBe("Hello...");
    });

    it("supports character-level truncation", () => {
        expect(
            truncate("Hello wonderful world", 15, {
                preserveWords: false,
            })
        ).toBe("Hello wonder...");
    });

    it("supports a custom suffix", () => {
        expect(
            truncate("This is a long text", 15, {
                suffix: "…",
            })
        ).toBe("This is a long…");
    });

    it("handles empty strings", () => {
        expect(truncate("", 10)).toBe("");
    });

    it("handles zero maxLength", () => {
        expect(truncate("Hello world", 0)).toBe("");
    });

    it("throws for negative maxLength", () => {
        expect(() => truncate("Hello", -1)).toThrow(
            RangeError
        );
    });

    it("throws for non-integer maxLength", () => {
        expect(() => truncate("Hello", 5.5)).toThrow(
            RangeError
        );
    });

    it("handles suffix longer than maxLength", () => {
        expect(
            truncate("Hello world", 2, {
                suffix: "...",
            })
        ).toBe("..");
    });
});