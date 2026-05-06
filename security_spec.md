# Security Specification - Lala Rohini Jewellers Admin

## 1. Data Invariants
- `Admin`: Only reachable by Super Admins for management. Users can only read their own profile.
- `Product`: Read-only for public. Write-only for authenticated Admins.
- `Collection`: Read-only for public. Write-only for authenticated Admins.
- `Enquiry`: Create allowed for anyone (to submit lead). Read/Write allowed only for authenticated Admins.
- `Banner`: Read-only for public. Write-only for authenticated Admins.

## 2. The "Dirty Dozen" Payloads (Deny Expected)

1. **Anonymous Product Creation**: Creating a product without being logged in.
2. **Unauthorized Product Update**: A logged-in customer trying to update a product price.
3. **Admin Self-Promotion**: An EDITOR role user trying to update their own role to SUPER_ADMIN.
4. **Invalid Product ID**: Providing a non-alphanumeric, overly long string as a product ID.
5. **PII Leak**: An anonymous user trying to list all enquiries (leads) which contain phone numbers.
6. **Shadow Field Injection**: Updating a product with an un-whitelisted field like `isVerified: true`.
7. **Negative Weight**: Creating a product with `weight: -50`.
8. **Malicious Link**: Injecting a `javascript:` link in banner `link` field.
9. **Fake Lead Creation**: Creating an enquiry with a 1MB string for the `message` field.
10. **Orphaned Lead**: Creating an enquiry with a `productId` that does not exist in the catalog.
11. **Future Timestamp**: Setting `createdAt` to a future date instead of `request.time`.
12. **Status Skipping**: Moving an enquiry status directly from `New` to `Closed` without intermediate steps (if flow is enforced).

## 3. Test Runner (Draft)
A `firestore.rules.test.ts` would be used to verify these logic leaks.
