export interface Track {
    asset: string,
    md5: string,
    content_type: string,
    filesize: number,
    rating: number | null,
    nsfw: boolean,
    created_at: string,
    duration: number | null,
    num_plays: number | null,
    last_viewed_at: string | null,
    date_aquired_at: string | null,
    shared: boolean,
    url: string,
    label: string | null,
    position: number | null,
    bundle_pos: number | null
}
