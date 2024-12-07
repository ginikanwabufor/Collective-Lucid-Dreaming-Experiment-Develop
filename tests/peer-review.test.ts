import { describe, test, expect, beforeEach } from 'vitest';

interface Review {
  score: number;
  comment: string;
}

interface ReportScore {
  totalScore: number;
  reviewCount: number;
}

describe('Peer Review', () => {
  let reviews: Map<string, Review>;
  let reportScores: Map<number, ReportScore>;
  
  const reviewer1 = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const reviewer2 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    reviews = new Map();
    reportScores = new Map();
  });
  
  test('reviewers can submit reviews', () => {
    const dreamReportId = 1;
    const review = {
      score: 4,
      comment: "Great dream report!"
    };
    
    // Submit review
    const reviewKey = `${reviewer1}-${dreamReportId}`;
    reviews.set(reviewKey, review);
    
    const currentScore = reportScores.get(dreamReportId) || { totalScore: 0, reviewCount: 0 };
    reportScores.set(dreamReportId, {
      totalScore: currentScore.totalScore + review.score,
      reviewCount: currentScore.reviewCount + 1
    });
    
    // Verify review was stored
    expect(reviews.get(reviewKey)).toEqual(review);
    
    // Verify report score was updated
    const reportScore = reportScores.get(dreamReportId);
    expect(reportScore?.totalScore).toBe(4);
    expect(reportScore?.reviewCount).toBe(1);
  });
  
  test('multiple reviews update scores correctly', () => {
    const dreamReportId = 1;
    
    // Submit first review
    const review1 = { score: 4, comment: "Great report!" };
    reviews.set(`${reviewer1}-${dreamReportId}`, review1);
    reportScores.set(dreamReportId, { totalScore: 4, reviewCount: 1 });
    
    // Submit second review
    const review2 = { score: 5, comment: "Excellent analysis!" };
    reviews.set(`${reviewer2}-${dreamReportId}`, review2);
    const currentScore = reportScores.get(dreamReportId)!;
    reportScores.set(dreamReportId, {
      totalScore: currentScore.totalScore + review2.score,
      reviewCount: currentScore.reviewCount + 1
    });
    
    // Verify final scores
    const finalScore = reportScores.get(dreamReportId);
    expect(finalScore?.totalScore).toBe(9);
    expect(finalScore?.reviewCount).toBe(2);
  });
});

