import { AccountControllerApi, Configuration, MusicPlayControllerApi, type AddSongToPlaylistRequest, type CreateAccountRequest, type CreatePlaylistRequest, type DeletePlaylistRequest, type DeleteSongFromPlaylistRequest, type EditEmailRequest, type EditFirstNameRequest, type EditLastNameRequest, type EditPasswordRequest, type EditUsernameRequest, type LoginRequest } from './api/index';
import { BLANK_SONG_CONTAINER, Navigator, Player, SongContainer, SongContainerTypes } from './shared';

const config = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
});

const TEST_COVER_PATH = 'https://en.wikipedia.org/wiki/The_White_Stripes_(album)#/media/File:The_White_Stripes_-_The_White_Stripes.jpg';

class MusicPlayService {

    #api = new MusicPlayControllerApi(config)

    createPlaylist(requestParameters: CreatePlaylistRequest) {
        this.#api.createPlaylist(requestParameters);
    }

    deletePlaylist(requestParameters: DeletePlaylistRequest) {
        this.#api.deletePlaylist(requestParameters);
    }

    addSongToPlaylist(requestParameters: AddSongToPlaylistRequest) {
        this.#api.addSongToPlaylist(requestParameters);
    }

    deleteSongFromPlaylist(requestParameters: DeleteSongFromPlaylistRequest) {
        this.#api.deleteSongFromPlaylist(requestParameters);
    }

    async getAlbums(): Promise<SongContainer[]> {
        return (await this.#api.getAlbums()).map((albumDto) =>
            new SongContainer(albumDto, albumDto.coverPath as string, SongContainerTypes.ALBUM));
    }

    async getPlaylists(): Promise<SongContainer[]> {
        return (await this.#api.getPlaylists()).map((p) =>
            new SongContainer(p, TEST_COVER_PATH, SongContainerTypes.PLAYLIST));
    }

    async getExploreFeed(): Promise<Map<string, SongContainer[]>> {
        // TODO
        const response = new Map<string, SongContainer[]>();
        // const exploreFeed = await this.#api.getExploreFeed();
        return response;
    }

    async getAllMusic(): Promise<Map<string, SongContainer[]>> {
        const response = new Map<string, SongContainer[]>();

        (await this.#api.getAllMusic()).map((allMusicDto) => {
            response.set(allMusicDto.artistName as string, allMusicDto.albums?.map(
                albumDto => new SongContainer(albumDto, albumDto.coverPath as string, SongContainerTypes.DIRECTORY)) ?? []);
        });

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

    #api = new AccountControllerApi(config);

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
            await this.#api.createAccount(requestParameters);
            isAccountCreated = true;
        } catch (error) { }
        finally {
            return isAccountCreated
        }
    }

    async login(requestParameters: LoginRequest): Promise<boolean> {
        let token = '';

        try {
            const response = await this.#api.login(requestParameters);
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
        this.#api.editUsername(requestParameters);
    }

    editPassword(requestParameters: EditPasswordRequest) {
        this.#api.editPassword(requestParameters);
    }

    editEmail(requestParameters: EditEmailRequest) {
        this.#api.editEmail(requestParameters);
    }

    editFirstName(requestParameters: EditFirstNameRequest) {
        this.#api.editFirstName(requestParameters);
    }

    editLastName(requestParameters: EditLastNameRequest) {
        this.#api.editLastName(requestParameters);
    }

}

export const musicPlayService = new MusicPlayService();
export const accountService = new AccountService();
export const playerService = new Player();
export const navigatorService = new Navigator();
