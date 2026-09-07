export interface SlugifyOptions {
    separator?: string;
    lowercase?: boolean;
    strict?: boolean;
    trim?: boolean;
}

const DEFAULT_OPTIONS: Required<SlugifyOptions> = {
    separator: "-",
    lowercase: true,
    strict: true,
    trim: true,
};

export function slugify(
    text: string,
    options?: SlugifyOptions
): string {
    if (typeof text !== "string") {
        throw new TypeError("slugify() expects a string");
    }

    const config = {
        ...DEFAULT_OPTIONS,
        ...options,
    };

    if (!config.separator) {
        throw new Error("separator must not be empty");
    }

    let result = text
        // Normalize Unicode characters
        .normalize("NFKD")
        // Remove combining marks (accents)
        .replace(/[\u0300-\u036f]/g, "")
        // Convert whitespace to separator
        .replace(/\s+/g, config.separator);

    if (config.strict) {
        // Escape separator for use inside RegExp
        const escapedSeparator = escapeRegExp(config.separator);

        // Replace characters that are not letters, numbers,
        // or the configured separator.
        result = result.replace(
            new RegExp(`[^\\p{L}\\p{N}${escapedSeparator}]`, "gu"),
            ""
        );
    }

    const escapedSeparator = escapeRegExp(config.separator);

    result = result.replace(
        new RegExp(`${escapedSeparator}+`, "g"),
        config.separator
    );

    if (config.trim) {
        result = result
            .replace(
                new RegExp(`^${escapedSeparator}+`, "g"),
                ""
            )
            .replace(
                new RegExp(`${escapedSeparator}+$`, "g"),
                ""
            );
    }

    if (config.lowercase) {
        result = result.toLowerCase();
    }

    return result;

}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}