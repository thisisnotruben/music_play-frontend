export type Song = {
    name: string;
    artistName: string;
    album: string;
    genre: string;
    length: number;
    audioPath: string;
    coverPath: string;
}

export type SongContainer = {
    songs: Song[]
    name: string;
    coverPath: string;
}

export const LoopType = {
    OFF: 0,
    ALL: 1,
    SINGULAR: 2,
}

export const testSong: Song = {
    name: 'I dont know what to do with myself',
    artistName: 'Jack White',
    album: 'The White Stripes',
    genre: 'rock',
    length: 138,
    coverPath: 'https://upload.wikimedia.org/wikipedia/en/2/2b/The_White_Stripes_-_The_White_Stripes.jpg',
    audioPath: "TODO",
};


export class Player {

    _currSong: Song | null = null;

    playSong(song: Song | null) {

    }

    pause() {

    }

    resume() {

    }

    setVolume(value: number) {

    }

    getCurrentSeek(): number {
        return 61;
    }

    getSong(): Song | null {
        return testSong;
    }

}

export class SongSource {

    source: SongContainer;
    _currSong: Song

    constructor(source: SongContainer) {
        this.source = source;
        this._currSong = source.songs.at(0) as Song;
    }

    getCurrentSong(): Song {
        return this._currSong;
    }

    getPrevSong(loopType: Number, shuffle: boolean): Song | null {
        let currIndex = this.source.songs.indexOf(this._currSong);
        switch (loopType) {
            case LoopType.OFF:
                this._currSong = this.source.songs.at(Math.max(0, currIndex - 1)) as Song;
                return this._currSong;
            case LoopType.ALL:
                this._currSong = this.source.songs.at((currIndex - 1) % this.source.songs.length) as Song;
                return this._currSong;
            case LoopType.SINGULAR:
                return this._currSong;
            default:
                return null;
        }
    }

    getNextSong(loopType: Number, shuffle: boolean): Song | null {
        let currIndex = this.source.songs.indexOf(this._currSong);
        switch (loopType) {
            case LoopType.OFF:
                this._currSong = this.source.songs.at(
                    Math.min(this.source.songs.length - 1, currIndex + 1)) as Song;
                return this._currSong;
            case LoopType.ALL:
                this._currSong = this.source.songs.at((currIndex + 1) % this.source.songs.length) as Song;
                return this._currSong;
            case LoopType.SINGULAR:
                return this._currSong;
            default:
                return null;
        }
    }

}

export const SongContainerTypes = { ALBUM: 'album', PLAYLIST: 'playlist' }
export class SongContainerHandler {

    songContainer: SongContainer;
    type: string;

    constructor(songContainer: SongContainer, type: string) {
        this.songContainer = songContainer;
        this.type = type;
    }

    getSongContainer(): SongContainer {
        return this.songContainer;
    }

    getType(): string {
        return this.type;
    }

    goTo() {

    }

}

const testSongContainer: SongContainer = { songs: [testSong], name: "The White Stripes", coverPath: 'https://upload.wikimedia.org/wikipedia/en/2/2b/The_White_Stripes_-_The_White_Stripes.jpg' };
const testSongContainerHandler = new SongContainerHandler(testSongContainer, SongContainerTypes.ALBUM);

export const testSongSource = new SongSource(testSongContainer);
export const playlists = [testSongContainerHandler, testSongContainerHandler, testSongContainerHandler, testSongContainerHandler, testSongContainerHandler, testSongContainerHandler];
export const player = new Player();
