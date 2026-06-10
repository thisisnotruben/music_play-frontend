export function formatPlaybackTime(seconds: number): string {
    return Number.isNaN(seconds) ?
        '00:00'
        : Math.floor(seconds / 60).toString().padStart(2, '0')
            .concat(':')
            .concat(Math.floor(seconds % 60).toString().padStart(2, '0'));
}