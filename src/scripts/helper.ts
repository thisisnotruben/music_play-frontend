export function formatPlaybackTime(seconds: number): string {
    return Math.floor(seconds / 60).toString().padStart(2, '0')
        .concat(':')
        .concat((seconds % 60).toString().padStart(2, '0'));
}