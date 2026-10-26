/**
 * Canonical contract for Conversation Intelligence, Policy Grounding, and
 * Emotion/Interaction signals
 */
export interface AnalysisEmotionV01Gen {
    checklistResults: ChecklistResult[];
    emotionSignals:   EmotionSignals;
    jobId:            string;
    meetingMinutes:   MeetingMinute[];
    summary:          string;
    topics:           string[];
    [property: string]: unknown;
}

export interface ChecklistResult {
    checklistId:        string;
    evidenceSegmentIds: string[];
    findings?:          string;
    passed:             boolean;
    policyDocId:        string;
    policySection:      string;
    policyVersion:      string;
    title:              string;
    [property: string]: unknown;
}

export interface EmotionSignals {
    acousticFeatures: AcousticFeatures;
    /**
     * Notice: Signals are supportive indicators for review/coaching only; never absolute
     * conclusions about character or intent.
     */
    disclaimer:       string;
    flaggedMoments?:  FlaggedMoment[];
    linguisticTone:   LinguisticTone;
    uncertaintyScore: number;
    [property: string]: unknown;
}

export interface AcousticFeatures {
    interruptionCount:   number;
    pitchVariabilityHz?: number;
    silenceRatio:        number;
    speechRateWpm:       number;
    [property: string]: unknown;
}

export interface FlaggedMoment {
    confidence:  number;
    indicator:   string;
    observation: string;
    segmentId:   string;
    [property: string]: unknown;
}

export type LinguisticTone = "NEUTRAL" | "POLITE_COLLABORATIVE" | "HESITANT" | "CONCERNED" | "TENSE";

export interface MeetingMinute {
    actionItems?: string[];
    content:      string;
    title:        string;
    [property: string]: unknown;
}
