# 🔐 OWASP Top 10 Security Vulnerabilities (OWASP Top 10 – 2021)

The OWASP Top 10 lists the most critical security risks for web applications.

---

## 1. Broken Access Control

Description:
Failures in access control allow users to act outside their intended permissions.

Examples:
- Accessing admin endpoints without authorization
- Insecure Direct Object References (IDOR)

Mitigation:
- Enforce server-side authorization
- Deny access by default
- Role-based access control (RBAC)

---

## 2. Cryptographic Failures

Description:
Sensitive data is not properly protected due to weak or missing cryptography.

Examples:
- Plaintext passwords
- Weak hashing algorithms (MD5, SHA1)

Mitigation:
- Use HTTPS everywhere
- Hash passwords with bcrypt or Argon2
- Encrypt sensitive data at rest

---

## 3. Injection

Description:
Untrusted input is executed as code by the application.

Examples:
SQL Injection:
SELECT * FROM users WHERE id = '1 OR 1=1';

Mitigation:
- Prepared statements
- Input validation
- Use ORM frameworks

---

## 4. Insecure Design

Description:
Security weaknesses caused by flawed design decisions.

Examples:
- No rate limiting
- Missing threat modeling

Mitigation:
- Perform threat modeling
- Use secure design patterns
- Defense in depth

---

## 5. Security Misconfiguration

Description:
Improper security configuration across the application stack.

Examples:
- Default credentials
- Debug mode enabled in production

Mitigation:
- Secure defaults
- Configuration hardening
- Regular security reviews

---

## 6. Vulnerable and Outdated Components

Description:
Using components with known security vulnerabilities.

Examples:
- Outdated libraries
- Unpatched frameworks

Mitigation:
- Regular dependency updates
- Vulnerability scanning
- Maintain SBOM

---

## 7. Identification and Authentication Failures

Description:
Weak authentication and session management.

Examples:
- No multi-factor authentication
- Weak password policies

Mitigation:
- Implement MFA
- Secure session handling
- Strong password enforcement

---

## 8. Software and Data Integrity Failures

Description:
Failures related to untrusted software updates or data.

Examples:
- Compromised CI/CD pipelines
- Unsigned software updates

Mitigation:
- Code signing
- Secure CI/CD pipelines
- Integrity verification

---

## 9. Security Logging and Monitoring Failures

Description:
Lack of logging and monitoring allows attacks to go unnoticed.

Examples:
- No login failure logs
- No alerting system

Mitigation:
- Centralized logging
- Real-time alerts
- Incident response plans

---

## 10. Server-Side Request Forgery (SSRF)

Description:
The server is tricked into making unauthorized internal requests.

Examples:
http://169.254.169.254/

Mitigation:
- URL allowlisting
- Network segmentation
- Restrict outbound traffic

---

Memory Trick:
Access → Crypto → Injection → Design → Config  
Components → Auth → Integrity → Logging → SSRF
