/**
 * Canonical contract for audio processing job state in IX.VOICE v0.1
 */
export interface AudioJobV01Gen {
    audioMetadata: AudioMetadata;
    createdAt:     Date;
    errors?:       Error[];
    jobId:         string;
    progress:      number;
    status:        Status;
    traceId:       string;
    updatedAt:     Date;
    [property: string]: unknown;
}

export interface AudioMetadata {
    channels?:   number;
    durationMs?: number;
    filename:    string;
    fileSize:    number;
    format:      string;
    sampleRate?: number;
    [property: string]: unknown;
}

export interface Error {
    code:       string;
    message:    string;
    stage?:     string;
    timestamp?: Date;
    [property: string]: unknown;
}

export type Status = "QUEUED" | "VALIDATING" | "VAD_PROCESSING" | "ASR_DIARIZATION" | "NLP_ANALYSIS" | "COMPLETED" | "FAILED";
