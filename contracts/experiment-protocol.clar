;; experiment-protocol contract

(define-map experiments
  { id: uint }
  {
    name: (string-ascii 64),
    description: (string-ascii 256),
    start-block: uint,
    end-block: uint,
    required-reports: uint
  }
)

(define-map participant-progress
  { participant: principal, experiment-id: uint }
  { reports-submitted: uint, completed: bool }
)

(define-data-var last-experiment-id uint u0)

(define-constant contract-owner tx-sender)

(define-public (create-experiment (name (string-ascii 64)) (description (string-ascii 256)) (duration uint) (required-reports uint))
  (let
    (
      (experiment-id (+ (var-get last-experiment-id) u1))
    )
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (map-set experiments
      { id: experiment-id }
      {
        name: name,
        description: description,
        start-block: block-height,
        end-block: (+ block-height duration),
        required-reports: required-reports
      }
    )
    (var-set last-experiment-id experiment-id)
    (ok experiment-id)
  )
)

(define-public (submit-report (experiment-id uint))
  (let
    (
      (participant tx-sender)
      (experiment (unwrap! (map-get? experiments { id: experiment-id }) (err u404)))
      (progress (default-to { reports-submitted: u0, completed: false }
        (map-get? participant-progress { participant: participant, experiment-id: experiment-id })))
    )
    (asserts! (< block-height (get end-block experiment)) (err u401))
    (map-set participant-progress
      { participant: participant, experiment-id: experiment-id }
      {
        reports-submitted: (+ (get reports-submitted progress) u1),
        completed: (>= (+ (get reports-submitted progress) u1) (get required-reports experiment))
      }
    )
    (ok true)
  )
)

(define-read-only (get-experiment (experiment-id uint))
  (map-get? experiments { id: experiment-id })
)

(define-read-only (get-participant-progress (participant principal) (experiment-id uint))
  (map-get? participant-progress { participant: participant, experiment-id: experiment-id })
)

