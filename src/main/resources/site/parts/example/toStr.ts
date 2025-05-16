type ReplacerFn = (this: unknown, key: string, value: unknown) => unknown;
type Replacer = ReplacerFn | undefined

export function toStr(
    value: unknown,
    replacer?: Replacer,
    space: string | number | undefined = 4
): string {
    return JSON.stringify(value, replacer, space);
}
