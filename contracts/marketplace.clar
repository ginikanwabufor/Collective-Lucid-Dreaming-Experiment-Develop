;; marketplace contract

(define-map items
  { id: uint }
  {
    name: (string-ascii 64),
    description: (string-ascii 256),
    seller: principal,
    available: bool
  }
)

(define-data-var last-item-id uint u0)

(define-public (list-item (name (string-ascii 64)) (description (string-ascii 256)))
  (let
    (
      (item-id (+ (var-get last-item-id) u1))
    )
    (map-set items
      { id: item-id }
      {
        name: name,
        description: description,
        seller: tx-sender,
        available: true
      }
    )
    (var-set last-item-id item-id)
    (ok item-id)
  )
)

(define-public (buy-item (item-id uint))
  (let
    (
      (item (unwrap! (map-get? items { id: item-id }) (err u404)))
    )
    (asserts! (get available item) (err u401))
    (map-set items
      { id: item-id }
      (merge item { available: false })
    )
    (ok true)
  )
)

(define-read-only (get-item (item-id uint))
  (map-get? items { id: item-id })
)

