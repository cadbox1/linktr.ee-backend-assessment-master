# README

## Getting Started

Install Node 12.14.1 or run `nvm use` if you're using [NVM](https://github.com/nvm-sh/nvm).

## Scripts

- `npm install` - install dependencies.
- `npm run start` - start the server on `http://localhost:3000/`.

## Endpoints

- GET /links
- POST /links

## Example Curls
### Get Links
```
curl --location --request GET 'http://localhost:3000/links'
```
### Get Links by User
```
curl --location --request GET 'http://localhost:3000/links?userId=1'
```
## Post Classic Link
```
curl --location --request POST 'http://localhost:3000/links' \
--header 'Content-Type: application/json' \
--data-raw '{ 
	"title": "github",
	"type": "classic",
	"data": {
		"url": "https://github.com/cadbox1"
	}
} '
```
## Post Classic Link Fail
```
curl --location --request POST 'http://localhost:3000/links' \
--header 'Content-Type: application/json' \
--data-raw '{ 
	"title": "this title is far far far far far far far far far far far far far far far far too long and will not be accepted, tolerated, allowed, accepted, tolerated, allowed, accepted, tolerated, allowed, etc.",
	"type": "classic",
	"data": {
		"url": "https://github.com/cadbox1"
	}
} '
```

## Progress
### GET /links
Done:
- get links
- get links by userId

Outstanding:
- get links by created date

### Post /links
Done:
- validate classic link title
- creating a classic link

Outstanding:
- validate classic link url
- validate shows
- validate a player
  

## Schema

Copied from `/src/types.ts`.

```
// Common
export enum LinkTypeEnum {
    CLASSIC,
    SHOW,
    PLAYER,
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
```