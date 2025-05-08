export const toArray = <T>(value: T | T[] | null | undefined): T[] => {
    return [].concat(value || []) as T[];
};
