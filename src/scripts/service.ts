import { useAuthStore } from '@/stores/auth';
import { Configuration, MusicPlayControllerApi, SearchControllerApi, type AddSongToPlaylistRequest, type AlbumDto, type CreatePlaylistRequest, type DeletePlaylistRequest, type DeleteSongFromPlaylistRequest, type EditPLaylistRequest, type GetAlbumRequest, type GetSearchRequest, type SongDto } from './api/index';
import { BLANK_SONG_CONTAINER, Player, SongContainer, SongContainerTypes } from './shared';

const apiAppCoverStorageUrl: string = import.meta.env.VITE_API_APP_COVER_STORAGE_URL;
const apiAppAudioStorageUrl: string = import.meta.env.VITE_API_APP_AUDIO_STORAGE_URL;
const apiUserStorageUrl: string = import.meta.env.VITE_API_USER_STORAGE_URL;

const config = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
    accessToken: () => useAuthStore().token ?? ''
});

export function getFullPath(coverPath: string, urlPath = apiAppCoverStorageUrl): string {
    return coverPath.length > 0 ? `${urlPath}/${coverPath}` : '';
}

class MusicPlayService {

    constructor(private api = new MusicPlayControllerApi(config)) { }

    async createPlaylist(requestParameters: CreatePlaylistRequest): Promise<SongContainer> {
        const createdPlaylist = await this.api.createPlaylist(requestParameters);
        return new SongContainer(
            createdPlaylist,
            getFullPath(createdPlaylist.coverPath ?? '', apiUserStorageUrl),
            SongContainerTypes.PLAYLIST);
    }

    async editPlaylist(requestParameters: EditPLaylistRequest): Promise<SongContainer> {
        const editedPlaylist = await this.api.editPLaylist(requestParameters);
        return new SongContainer(
            editedPlaylist,
            getFullPath(editedPlaylist.coverPath ?? '', apiUserStorageUrl),
            SongContainerTypes.PLAYLIST);
    }

    deletePlaylist(requestParameters: DeletePlaylistRequest) {
        this.api.deletePlaylist(requestParameters);
    }

    addSongToPlaylist(requestParameters: AddSongToPlaylistRequest) {
        this.api.addSongToPlaylist(requestParameters);
    }

    deleteSongFromPlaylist(requestParameters: DeleteSongFromPlaylistRequest) {
        this.api.deleteSongFromPlaylist(requestParameters);
    }

    async getAlbum(requestParameters: GetAlbumRequest): Promise<SongContainer> {
        const res = await this.api.getAlbum(requestParameters);
        return new SongContainer(res, getFullPath(res.coverPath ?? ''), SongContainerTypes.ALBUM);
    }

    async getAlbums(): Promise<SongContainer[]> {
        return (await this.api.getAlbums()).map((albumDto) =>
            new SongContainer(albumDto,
                getFullPath(albumDto.coverPath ?? ''),
                SongContainerTypes.ALBUM));
    }

    async getArtists(): Promise<Map<string, SongContainer[]>> {
        const response = new Map<string, SongContainer[]>();

        (await this.api.getArtists()).map((artistDto) => {
            response.set(artistDto.name as string, artistDto.albums?.map(
                albumDto => new SongContainer(albumDto,
                    getFullPath(albumDto.coverPath ?? ''),
                    SongContainerTypes.ALBUM)) ?? []);
        });

        return response;
    }

    async getPlaylists(): Promise<SongContainer[]> {
        return (await this.api.getPlaylists()).map((playlistDto) =>
            new SongContainer(playlistDto,
                getFullPath(playlistDto.coverPath ?? '', apiUserStorageUrl),
                SongContainerTypes.PLAYLIST));
    }

    async getExploreFeed(): Promise<Map<string, SongContainer[]>> {
        // TODO
        const response = new Map<string, SongContainer[]>();
        // const exploreFeed = await this.#api.getExploreFeed();
        return response;
    }

    getDummyMusic(sectionAmt: number, entryAmt: number): Map<string, SongContainer[]> {
        const response = new Map<string, SongContainer[]>();

        for (let i = 0; i < sectionAmt; i++) {
            const entry: SongContainer[] = [];
            for (let j = 0; j < entryAmt; j++) {
                entry.push(BLANK_SONG_CONTAINER);
            }
            response.set(i.toString(), entry);
        }

        return response;
    }

}

class SearchService {

    constructor(private api = new SearchControllerApi(config)) { }

    async getSearch(requestParameters: GetSearchRequest): Promise<SongContainer[]> {
        const res: SongContainer[] = [];
        const response = await this.api.getSearch(requestParameters);
        response.map((r: AlbumDto | SongDto) => {
            let songContainer = new SongContainer(r, getFullPath(r.coverPath ?? ''), SongContainerTypes.BLANK);
            switch (r?.type?.toUpperCase()) {
                case "ALBUM":
                    songContainer.typeName = SongContainerTypes.ALBUM;
                    res.push(songContainer);
                    break;
                case "SONG":
                    songContainer.typeName = SongContainerTypes.SONG;
                    res.push(songContainer);
                    break;
            }
        });
        return res;
    }

}

export const musicPlayService = new MusicPlayService();
export const searchService = new SearchService();
export const playerService = new Player(apiAppAudioStorageUrl);
