import { AccountControllerApi, Configuration, MusicPlayControllerApi, SearchControllerApi, type AddSongToPlaylistRequest, type AlbumDto, type AppUserDto, type CreateAccountRequest, type CreatePlaylistRequest, type DeletePlaylistRequest, type DeleteSongFromPlaylistRequest, type EditEmailRequest, type EditFirstNameRequest, type EditLastNameRequest, type EditPasswordRequest, type EditPLaylistRequest, type EditUsernameRequest, type GetAlbumRequest, type GetSearchRequest, type LoginRequest, type PlaylistDto, type SongDto } from './api/index';
import { BLANK_SONG_CONTAINER, Player, SongContainer, SongContainerTypes } from './shared';


const apiAppCoverStorageUrl: string = import.meta.env.VITE_API_APP_COVER_STORAGE_URL;
const apiAppAudioStorageUrl: string = import.meta.env.VITE_API_APP_AUDIO_STORAGE_URL;
const apiUserStorageUrl: string = import.meta.env.VITE_API_USER_STORAGE_URL;
const config = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
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

class AccountService {

    constructor(private api = new AccountControllerApi(config)) { }

    getUsername(): string {
        return '';
    }

    setToken(token: string) {

    }

    async tokenIsValid(): Promise<boolean> {
        return true;
    }

    async createAccount(requestParameters: CreateAccountRequest): Promise<boolean> {
        let isAccountCreated = false;
        try {
            await this.api.createAccount(requestParameters);
            isAccountCreated = true;
        } catch (error) { }
        finally {
            return isAccountCreated
        }
    }

    async getAccountInfo(): Promise<AppUserDto> {
        return await this.api.getAccountInfo();
    }

    async login(requestParameters: LoginRequest): Promise<boolean> {
        let token = '';

        try {
            const response = await this.api.login(requestParameters);
            if (response.token) {
                token = response.token;
            }
        } catch (error) { }
        finally {
            this.setToken(token);
            return token.length > 0;
        }
    }

    editUsername(requestParameters: EditUsernameRequest) {
        this.api.editUsername(requestParameters);
    }

    editPassword(requestParameters: EditPasswordRequest) {
        this.api.editPassword(requestParameters);
    }

    editEmail(requestParameters: EditEmailRequest) {
        this.api.editEmail(requestParameters);
    }

    editFirstName(requestParameters: EditFirstNameRequest) {
        this.api.editFirstName(requestParameters);
    }

    editLastName(requestParameters: EditLastNameRequest) {
        this.api.editLastName(requestParameters);
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
export const accountService = new AccountService();
export const searchService = new SearchService();
export const playerService = new Player(apiAppAudioStorageUrl);
