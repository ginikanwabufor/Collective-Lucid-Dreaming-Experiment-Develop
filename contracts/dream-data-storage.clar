;; dream-data-storage contract

(define-map dream-reports
  { participant: principal, experiment-id: uint }
  { encrypted-report: (buff 1024), timestamp: uint }
)

(define-map biometric-data
  { participant: principal, experiment-id: uint }
  { encrypted-data: (buff 512), timestamp: uint }
)

(define-public (submit-dream-report (experiment-id uint) (encrypted-report (buff 1024)))
  (let
    (
      (participant tx-sender)
      (timestamp block-height)
    )
    (map-set dream-reports
      { participant: participant, experiment-id: experiment-id }
      { encrypted-report: encrypted-report, timestamp: timestamp }
    )
    (ok true)
  )
)

(define-public (submit-biometric-data (experiment-id uint) (encrypted-data (buff 512)))
  (let
    (
      (participant tx-sender)
      (timestamp block-height)
    )
    (map-set biometric-data
      { participant: participant, experiment-id: experiment-id }
      { encrypted-data: encrypted-data, timestamp: timestamp }
    )
    (ok true)
  )
)

(define-read-only (get-dream-report (participant principal) (experiment-id uint))
  (map-get? dream-reports { participant: participant, experiment-id: experiment-id })
)

(define-read-only (get-biometric-data (participant principal) (experiment-id uint))
  (map-get? biometric-data { participant: participant, experiment-id: experiment-id })
)

