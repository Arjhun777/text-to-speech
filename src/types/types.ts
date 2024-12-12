type Voice = {
    voice_id: string;
    name: string;
};

export type VoiceResponse = {
    data: {
        voices: Voice[];
    };
};
