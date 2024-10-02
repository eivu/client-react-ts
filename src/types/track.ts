export interface Track {
    asset: string,
    md5: string,
    filesize: number,
    rating: number | null,
    nsfw: boolean,
    createdAt: string,
    duration: number | null,
    numPlays: number | null,
    lastViewedAt: string | null,
    dateAquiredAt: string | null,
    shared: boolean,
    url: string,
    label: string | null,
    position: number | null,
    bundlePos: number | null
    contentType: string,
}
