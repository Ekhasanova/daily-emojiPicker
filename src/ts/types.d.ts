
export interface EmojiItem {
    name: string;
    relative_path: string;
    url: string;
}

export interface EmojiMap {
    [group: string]: EmojiItem[]
}

export interface EmojiData {
    emoji: string;
    emoji_src: string;
}

export interface EmojiPickerOptions<T extends EmojiMap> {
    source: EmojiSourceFn<T>;
    onSelect: OnEmojiSelectHandler;
    defaultActiveGroup: string;
}

export type OnEmojiSelectHandler  = (data: EmojiData) => void;

export type EmojiSourceFn<T extends EmojiMap>  = (...args: any[]) => Promise<T>;

