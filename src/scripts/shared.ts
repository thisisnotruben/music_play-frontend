import type { AlbumDto, PlaylistDto, SongDto } from "./api";

export const SongContainerTypes = {
    ALBUM: 'album',
    PLAYLIST: 'playlist',
    DIRECTORY: 'Directory',
    BLANK: 'Blank'
}

export class SongContainer {

    type: AlbumDto | PlaylistDto;
    coverPath: string;
    typeName: string;

    constructor(type: AlbumDto | PlaylistDto, coverPath: string, typeName: string) {
        this.type = type;
        this.coverPath = coverPath;
        this.typeName = typeName;
    }

    isEmpty(): boolean {
        return this.coverPath === SongContainerTypes.BLANK 
        && this.typeName === SongContainerTypes.BLANK;
    }

}

export const LoopType = {
    OFF: 0,
    ALL: 1,
    SINGULAR: 2,
}

export const BLANK_SONG_CONTAINER = new SongContainer({}, SongContainerTypes.BLANK, SongContainerTypes.BLANK );

export class Player {

    static loopTypes = [LoopType.ALL, LoopType.SINGULAR, LoopType.OFF];

    #currSong: SongDto | null = null;
    #source: SongContainer | null = null;
    #loopType = LoopType.OFF;


    toggleShuffle() {

    }

    getShuffle(): boolean {
        return false;
    }

    setLoopType() {
        this.#loopType = Player.loopTypes.at(
            (Player.loopTypes.indexOf(this.#loopType) + 1) % Player.loopTypes.length
        ) as number;
    }

    getLoopType() {
        return this.#loopType;
    }

    play(songContainer: SongContainer) {

    }

    playPrev() {

    }

    playNext() {

    }

    pause() {

    }

    resume() {

    }

    getCover(): string {
        return '';
    }

    setVolume(value: number) {

    }

    getCurrentSeek(): number {
        return 61;
    }

    getSong(): SongDto | null {
        return null;
    }

}

export class SongSource {

    #source: SongContainer;
    #currSong: SongDto | null

    constructor(source: SongContainer) {
        this.#source = source;
        this.#currSong = source.type.songs?.at(0) as SongDto;
    }

    getCurrentSong(): SongDto | null {
        return this.#currSong;
    }



    getPrevSong(loopType: Number, shuffle: boolean): SongDto | null {
        let currIndex = this.#source.type.songs?.indexOf(this.#currSong as SongDto) ?? -1;
        switch (loopType) {
            case LoopType.OFF:
                this.#currSong = this.#source.type.songs?.at(Math.max(0, currIndex - 1)) as SongDto;
                break;
            case LoopType.ALL:
                this.#currSong = this.#source.type.songs?.at((currIndex - 1) % this.#source.type.songs.length) as SongDto;
                break;
            case LoopType.SINGULAR:
                break;
            default:
                break;

        }
        return this.#currSong;
    }

    getNextSong(loopType: Number, shuffle: boolean): SongDto | null {
        let currIndex = this.#source.type.songs?.indexOf(this.#currSong as SongDto) ?? -1;
        switch (loopType) {
            case LoopType.OFF:
                this.#currSong = this.#source.type.songs?.at(Math.min(this.#source.type.songs.length - 1, currIndex + 1)) as SongDto;
                break;
            case LoopType.ALL:
                this.#currSong = this.#source.type.songs?.at((currIndex + 1) % this.#source.type.songs.length) as SongDto;
                break;
            case LoopType.SINGULAR:
                break;
            default:
                break;
        }
        return this.#currSong;
    }

}

export class Navigator {

    goTo(SongContainer: SongContainer) {

    }
}

