;; lucid-token contract

(define-fungible-token lucid-token)

(define-constant contract-owner tx-sender)

(define-public (mint (recipient principal) (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u403))
    (ft-mint? lucid-token amount recipient)
  )
)

(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) (err u403))
    (ft-transfer? lucid-token amount sender recipient)
  )
)

(define-read-only (get-balance (account principal))
  (ft-get-balance lucid-token account)
)

(define-read-only (get-total-supply)
  (ft-get-supply lucid-token)
)

