/**
 * Canonical contract for timestamped and speaker-attributed Vietnamese transcripts
 */
export interface TranscriptV01Gen {
    jobId:        string;
    language?:    string;
    modelVersion: string;
    qualityFlags: QualityFlags;
    segments:     Segment[];
    [property: string]: unknown;
}

export interface QualityFlags {
    averageConfidence?:          number;
    lowConfidenceSegmentsCount?: number;
    snrEstimateDb?:              number;
    [property: string]: unknown;
}

export interface Segment {
    confidence:   number;
    endMs:        number;
    id:           string;
    speakerId:    string;
    speakerLabel: string;
    startMs:      number;
    text:         string;
    words?:       Word[];
    [property: string]: unknown;
}

export interface Word {
    confidence?: number;
    endMs:       number;
    startMs:     number;
    word:        string;
    [property: string]: unknown;
}
