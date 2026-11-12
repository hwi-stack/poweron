# Security Specification for POWER ON Archive

## 1. Data Invariants
- Only verified administrators (`hwi@suwonrehab.or.kr` or UIDs in `/admins/{uid}`) can create, modify, or delete contents in `impact_metrics`, `activities`, `moments`, `voices`, and `site_settings`.
- Public visitors can only view published documents (`status == 'published'`) or open public settings.
- All IDs must adhere to `isValidId` (`size <= 128` and alphanumeric with hyphens/underscores).
- String lengths are bound by strict size limits preventing volumetric denial of service.

## 2. The Dirty Dozen Threat Vectors
1. Unauthenticated write injection to `impact_metrics`
2. Non-admin modifying metrics or activity records
3. Publishing unvetted or draft moments directly to public visitors
4. Admin privilege escalation by modifying admin document without auth
5. Path variable poisoning with malformed 10KB keys
6. Modifying read-only system immutable keys
7. Unverified email spoofing attack mimicking admin address
8. Oversized payload injection in story content (>50KB)
9. Tampering with activity statuses to bypass publication pipeline
10. Query scraping of private/draft staff interview quotes
11. Setting unrecognized committee categories or media types
12. Attempting to delete settings without admin privileges

## 3. Security Implementation Strategy
- Global default deny `match /{document=**} { allow read, write: if false; }`
- Verified admin helper `isAdmin()`
- Standalone `isValid[Entity]` helpers enforcing schema and length bounds
- Action-based update guards
