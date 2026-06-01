# Commodity Interests Rules Review

## Scope

- Added client writes to `/commodity_interests/{id}` from `src/lib/commodityInterests.ts`.
- The Prices page creates lead records only; it does not read or list this collection.
- Admin users can read, update, and delete these leads for ops follow-up.

## Data Model

Collection: `commodity_interests`

- `commodityName`: string, required, 1-120 chars.
- `commodityCode`: string, optional, max 20 chars.
- `state`: string, required, 1-80 chars.
- `district`: string, optional, max 80 chars.
- `intentType`: enum, `sell`, `buy`, `monitor`, or `research`.
- `volumeBand`: enum, `Under 5 MT`, `5-25 MT`, `25-100 MT`, `100+ MT`, or `Monitoring only`.
- `contactName`: string, required, 1-120 chars.
- `organization`: string, optional, max 160 chars.
- `email`: string, required, basic email shape, max 254 chars.
- `phone`: string, required, 8-24 chars.
- `notes`: string, optional, max 1000 chars.
- `source`: string, must be `prices_page`.
- `userId`: null for guests, or the authenticated user's UID.
- `feedStatus`: enum, `pilot_validation` or `queued`.
- `pageUrl`, `referrer`, `userAgent`, `locale`, `timezone`, `screenSize`: optional metadata strings with size limits.
- `createdAt`: timestamp.
- `status`: string, must be `ops_review`.

## Attack Checks

- Public reads are denied; only admins can read leads.
- Public creates are limited to the exact schema above and strict string sizes.
- Schema pollution is blocked with `keys().hasOnly(...)`.
- Oversized strings are limited on every accepted string field.
- Status, source, feed status, intent type, and volume band are constrained to expected values.
- Guest users cannot spoof another user's UID because non-null `userId` requires matching `request.auth.uid`.
- Public updates and deletes are denied; only admins can change or remove leads.

## Validation Notes

- `npm run lint` passed with existing warnings outside this change.
- `npm run build` passed.
- Firebase CLI rules dry-run could not run because this workspace does not contain `firebase.json`.
