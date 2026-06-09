import type { AlbumDto, PlaylistDto, SongDto } from "./api";

export const SongContainerTypes = {
    ALBUM: 'album',
    PLAYLIST: 'playlist',
    SONG: 'Song',
    BLANK: 'Blank'
}

export class SongContainer {

    type: AlbumDto | PlaylistDto | SongDto;
    coverPath: string;
    typeName: string;

    constructor(type: AlbumDto | PlaylistDto | SongDto, coverPath: string, typeName: string) {
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

export type SelectEntrySignalDto = {
    entry: SongContainer,
    songFocus: SongDto
}

export const BLANK_SONG_CONTAINER = new SongContainer({}, SongContainerTypes.BLANK, SongContainerTypes.BLANK);
export const BLANK_SONG: SongDto = {
    type: '', coverPath: '', id: -1, name: '',
    genre: '', length: -1, audioPath: '',
    albumName: '', albumId: -1, artistName: '',
}

export class Player {

    static loopTypes = [LoopType.ALL, LoopType.SINGULAR, LoopType.OFF];

    player: HTMLMediaElement | null = null;
    source: SongContainer | null = null;

    private songs: SongDto[] = [];
    private currSongIndex = -1;
    private loopType = LoopType.OFF;
    private isShuffling = false;

    constructor(private basePath: string) { }

    init(player: HTMLMediaElement) {
        this.player = player;

        this.player.addEventListener('ended', () => {
            if (this.loopType == LoopType.ALL) {
                this.playNext();
            }
        });

        this.player.addEventListener('ended', () =>
            document.dispatchEvent(
                new CustomEvent('songPlayed', { detail: BLANK_SONG }))
        );

        document.dispatchEvent(new CustomEvent('playerSet', { detail: player }));
    }

    setLoopType(loopType: number) {
        if (this.player) {
            this.player.loop = loopType == LoopType.SINGULAR;
            this.loopType = loopType;
        }
    }

    getLoopType() {
        return this.loopType;
    }

    toggleShuffle() {
        this.isShuffling = !this.isShuffling;
        if (this.isShuffling) {
            this.setSongs();
        } else {
            const arrCopy = [...this.songs];
            this.shuffle(arrCopy);
            this.songs = arrCopy;
        }
    }

    getShuffle(): boolean {
        return this.isShuffling;
    }

    async play(song: SongDto, source?: SongContainer) {
        if (!this.player) {
            return;
        }

        if (source) {
            if (this.source != source) {
                this.source = source;
                this.setSongs();
            } else {
                this.currSongIndex = this.songs.indexOf(song as SongDto);
            }
        }

        if (song.id == -1 && this.songs.length > 0) {
            song = this.songs.at(0) as SongDto;
        }

        if (song.audioPath && song.audioPath.length > 0) {
            this.player.src = `${this.basePath}/${song.audioPath}`;
            await this.player.play();
            document.dispatchEvent(new CustomEvent('songPlayed', { detail: song }));
        }
    }

    reset() {
        this.currSongIndex = 0;
    }

    playPrev() {
        this.currSongIndex--;
        switch (this.loopType) {
            case LoopType.OFF:
                this.currSongIndex = Math.max(this.currSongIndex, 0);
                break;
            case LoopType.ALL:
                this.currSongIndex = this.currSongIndex % this.songs.length;
                break;
        }
        this.play(this.songs[this.currSongIndex] as SongDto);
    }

    playNext() {
        this.currSongIndex++;
        switch (this.loopType) {
            case LoopType.OFF:
                this.currSongIndex = Math.min(this.currSongIndex, this.songs.length - 1);
                break;
            case LoopType.ALL:
                this.currSongIndex = this.currSongIndex % this.songs.length;
                break;
        }
        this.play(this.songs[this.currSongIndex] as SongDto);
    }

    private setSongs() {
        switch (this.source?.typeName) {
            case SongContainerTypes.ALBUM:
                this.songs = (this.source.type as AlbumDto).songs as SongDto[];
                break;
            case SongContainerTypes.PLAYLIST:
                this.songs = (this.source.type as PlaylistDto).songs as SongDto[];
                break;
        }
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    private shuffle(array: Array<SongDto | undefined>) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }

}