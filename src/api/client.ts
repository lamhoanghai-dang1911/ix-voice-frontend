import {
  AudioJob,
  Transcript,
  AnalysisEmotion,
  EvidenceQAReview,
  ReviewDecision,
  AuditState
} from '../types/contracts';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Default minimal fallback templates (Domain data to be agreed by roles)
const fallbackJob: AudioJob = {
  jobId: "00000000-0000-0000-0000-000000000000",
  status: "QUEUED" as any,
  progress: 0,
  createdAt: new Date().toISOString()
};

const fallbackTranscript: Transcript = {
  jobId: "00000000-0000-0000-0000-000000000000",
  modelVersion: "PhoWhisper-small",
  language: "vi",
  qualityFlags: {
    snrEstimateDb: 25.0,
    lowConfidenceSegmentsCount: 0,
    averageConfidence: 1.0
  },
  segments: []
};

const fallbackAnalysis: AnalysisEmotion = {
  jobId: "00000000-0000-0000-0000-000000000000",
  summary: "Chưa có dữ liệu phân tích.",
  meetingMinutes: [],
  topics: [],
  checklistResults: []
};

const fallbackQA: EvidenceQAReview = {
  reviewId: "rev-001",
  jobId: "00000000-0000-0000-0000-000000000000",
  auditState: "PENDING" as any,
  decision: "REQUIRES_FURTHER_TRAINING" as any,
  decisionNotes: "",
  reviewer: { userId: "user-1", fullName: "QA Reviewer", role: "Auditor" },
  checklistEvaluations: []
};

export const apiClient = {
  async getJob(jobId: string): Promise<AudioJob> {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, returning minimal fallback for job:', err);
      return fallbackJob;
    }
  },

  async getTranscript(jobId: string): Promise<Transcript> {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/transcript`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, returning minimal fallback for transcript:', err);
      return fallbackTranscript;
    }
  },

  async getAnalysis(jobId: string): Promise<AnalysisEmotion> {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/analysis`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, returning minimal fallback for analysis:', err);
      return fallbackAnalysis;
    }
  },

  async getQAReview(jobId: string): Promise<EvidenceQAReview> {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/qa-review`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('API unavailable, returning minimal fallback for QA review:', err);
      return fallbackQA;
    }
  },

  async uploadAudio(file: File): Promise<{ jobId: string; status: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Upload failed');
    }

    return await res.json();
  },

  async submitQAReview(jobId: string, payload: {
    decision: ReviewDecision;
    auditState: AuditState;
    decisionNotes: string;
    reviewer: { userId: string; fullName: string; role: string };
  }): Promise<EvidenceQAReview> {
    try {
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}/qa-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to submit review');
      return await res.json();
    } catch (err) {
      console.warn('Submit review fallback to local mock update:', err);
      return {
        ...fallbackQA,
        ...payload,
        reviewedAt: new Date().toISOString(),
      };
    }
  }
};
