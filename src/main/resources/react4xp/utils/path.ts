export function parentPath(path: string): string {
    const parts = path.split('/').filter(Boolean);
    if (parts.length <= 1) {
        return '/';
    }
    parts.pop();
    return '/' + parts.join('/');
}
