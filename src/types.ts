// Common
export enum LinkTypeEnum {
    CLASSIC = "classic",
    SHOW = "show",
    PLAYER = "player",
}

export enum ShowPlatformEnum {
    SONGKICK
}

export enum PlayerPlatform {
    SPOTIFY,
    APPLE,
    SOUNDCLOUD,
    YOUTUBE,
    DEEZER,
    TIDAL,
    BANDCAMP,
}

// POST

export interface PostLinkRequestBody {
    title: string;
    type: LinkTypeEnum
    data: PostLinkClassicData | PostLinkShowData | PostLinkPlayerData
}

export interface PostLinkClassicData {
    url: string;
}

export interface PostLinkShowData {
    platform: ShowPlatformEnum,
    events: PostLinkEventData[],
}
export interface PostLinkEventData {
    eventDate: Date;
    saleDate: Date;
    venue: string;
    url: string;
    soldOut: boolean;
}


export interface PostLinkPlayerData {
    platform: PlayerPlatform
}

// GET

export type UserId = string;

export interface GetLinksRequestParameters {
    userId?: UserId;
    sortedBy?: string;
}

export interface GetLinksResponse {
    results: GetLinksResult[];
}

export interface GetLinksResult {
    id: string;
    title: string;
    userId: UserId;
    createdDate: Date;
    type: LinkTypeEnum;
    data: GetLinkClassicData | GetLinkShowData | GetLinkPlayerData
} 

// could potentially make PostLinkClassicData reusable but I'd rather not couple them right now.
export interface GetLinkClassicData {
    url: string;
}

// same here
export interface GetLinkShowData {
    platform: ShowPlatformEnum,
    events: GetLinkShowEventData[],
}
export interface GetLinkShowEventData {
    eventDate: Date;
    saleDate: Date;
    venue: string;
    url: string;
    soldOut: boolean;
}

// and same here
export interface GetLinkPlayerData {
    platform: PlayerPlatform;
    url: string;
}
