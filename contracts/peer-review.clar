;; peer-review contract

(define-map reviews
  { reviewer: principal, dream-report-id: uint }
  { score: uint, comment: (string-ascii 256) }
)

(define-map dream-report-scores
  { dream-report-id: uint }
  { total-score: uint, review-count: uint }
)

(define-constant min-score u1)
(define-constant max-score u5)

(define-public (submit-review (dream-report-id uint) (score uint) (comment (string-ascii 256)))
  (let
    (
      (reviewer tx-sender)
      (current-scores (default-to { total-score: u0, review-count: u0 }
        (map-get? dream-report-scores { dream-report-id: dream-report-id })))
    )
    (asserts! (and (>= score min-score) (<= score max-score)) (err u400))
    (map-set reviews
      { reviewer: reviewer, dream-report-id: dream-report-id }
      { score: score, comment: comment }
    )
    (map-set dream-report-scores
      { dream-report-id: dream-report-id }
      {
        total-score: (+ (get total-score current-scores) score),
        review-count: (+ (get review-count current-scores) u1)
      }
    )
    (ok true)
  )
)

(define-read-only (get-review (reviewer principal) (dream-report-id uint))
  (map-get? reviews { reviewer: reviewer, dream-report-id: dream-report-id })
)

(define-read-only (get-dream-report-score (dream-report-id uint))
  (map-get? dream-report-scores { dream-report-id: dream-report-id })
)

