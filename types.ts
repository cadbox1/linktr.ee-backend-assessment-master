// Common
enum LinkTypeEnum {
    CLASSIC,
    SHOW,
    PLAYER,
}

enum ShowPlatformEnum {
    SONGKICK
}

enum PlayerPlatform {
    SPOTIFY,
    APPLE,
    SOUNDCLOUD,
    YOUTUBE,
    DEEZER,
    TIDAL,
    BANDCAMP,
}

// POST

interface PostLinkBody {
    title: string;
    type: LinkTypeEnum
    data: PostLinkClassicData | PostLinkShowData | PostLinkPlayerData
}

interface PostLinkClassicData {
    url: string;
}

interface PostLinkShowData {
    platform: ShowPlatformEnum,
    events: PostLinkEventData[],
}
interface PostLinkEventData {
    eventDate: Date;
    saleDate: Date;
    venue: string;
    url: string;
    soldOut: boolean;
}


interface PostLinkPlayerData {
    platform: PlayerPlatform
}

// GET

type UserId = string;

interface GetLinksRequestParameters {
    userId?: UserId;
    sortedBy?: string;
}

interface GetLinksResponse {
    results: GetLinksResult[];
}

interface GetLinksResult {
    id: string;
    title: string;
    userId: UserId;
    createdDate: Date;
    type: LinkTypeEnum;
    data: GetLinkClassicData | GetLinkShowData | GetLinkPlayerData
} 

// could potentially make PostLinkClassicData reusable but I'd rather not couple them right now.
interface GetLinkClassicData {
    url: string;
}

// same here
interface GetLinkShowData {
    platform: ShowPlatformEnum,
    events: GetLinkShowEventData[],
}
interface GetLinkShowEventData {
    eventDate: Date;
    saleDate: Date;
    venue: string;
    url: string;
    soldOut: boolean;
}

// and same here
interface GetLinkPlayerData {
    platform: PlayerPlatform;
    url: string;
}
