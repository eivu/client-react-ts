import { QueueItem } from "./queueItem";

export interface Metadatum {
    id: number;
    type: string;
    value: string;
    explorable: boolean;
    delicate: boolean;
    nsfw: boolean;
    filesCount: number;
    secured: boolean;
    files: QueueItem[];
};
