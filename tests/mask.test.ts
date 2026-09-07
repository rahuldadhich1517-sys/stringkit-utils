import { describe, expect, it } from "vitest";
import { mask } from "../src/mask";

describe("mask", () => {
    it("masks the beginning by default", () => {
        expect(mask("9876543210")).toBe(
            "******3210"
        );
    });

    it("supports custom visible length", () => {
        expect(
            mask("9876543210", {
                visible: 2,
            })
        ).toBe("********10");
    });

    it("supports start position", () => {
        expect(
            mask("9876543210", {
                visible: 2,
                position: "start",
            })
        ).toBe("98********");
    });

    it("supports both positions", () => {
        expect(
            mask("9876543210", {
                visible: 2,
                position: "both",
            })
        ).toBe("98******10");
    });

    it("throws for invalid position", () => {
        expect(() =>
            mask("123456", {
                position: "invalid" as "start",
            })
        ).toThrow(
            'position must be one of "start", "end", or "both"'
        );
    });

    it("supports a custom mask character", () => {
        expect(
            mask("9876543210", {
                visible: 4,
                maskCharacter: "#",
            })
        ).toBe("######3210");
    });

    it("handles zero visible characters", () => {
        expect(
            mask("Hello", {
                visible: 0,
            })
        ).toBe("*****");
    });

    it("does not mask when visible length is enough", () => {
        expect(
            mask("Hello", {
                visible: 10,
            })
        ).toBe("Hello");
    });

    it("handles empty strings", () => {
        expect(mask("")).toBe("");
    });

    it("supports Unicode characters", () => {
        expect(
            mask("😀🚀🔥🎉", {
                visible: 2,
            })
        ).toBe("**🔥🎉");
    });

    it("throws for negative visible length", () => {
        expect(() =>
            mask("Hello", {
                visible: -1,
            })
        ).toThrow(RangeError);
    });

    it("throws for non-integer visible length", () => {
        expect(() =>
            mask("Hello", {
                visible: 2.5,
            })
        ).toThrow(RangeError);
    });

    it("throws for an empty mask character", () => {
        expect(() =>
            mask("Hello", {
                maskCharacter: "",
            })
        ).toThrow();
    });
});