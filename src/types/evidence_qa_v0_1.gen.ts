/**
 * Canonical contract for Human QA Review, Evidence verification and Decision Audit State
 */
export interface EvidenceQAV01Gen {
    auditState:          AuditState;
    checklistOverrides?: ChecklistOverride[];
    decision:            Decision;
    decisionNotes?:      string;
    jobId:               string;
    policyDocRefs:       PolicyDocRef[];
    reviewedAt:          Date;
    reviewer:            Reviewer;
    reviewId:            string;
    [property: string]: unknown;
}

export type AuditState = "PENDING_REVIEW" | "IN_REVIEW" | "APPROVED" | "FLAGGED_FOR_CORRECTION" | "REJECTED";

export interface ChecklistOverride {
    checklistId:      string;
    originalAiStatus: boolean;
    reason:           string;
    reviewerStatus:   boolean;
    [property: string]: unknown;
}

export type Decision = "PASS" | "PASS_WITH_ACTIONS" | "FAIL";

export interface PolicyDocRef {
    docId:          string;
    effectiveDate?: string;
    title:          string;
    version:        string;
    [property: string]: unknown;
}

export interface Reviewer {
    fullName: string;
    role:     string;
    userId:   string;
    [property: string]: unknown;
}
