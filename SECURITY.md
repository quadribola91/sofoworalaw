# Security & Backend Validation Guide

## Overview
This document outlines the security best practices and server-side validation strategy for the Olumide Sofowora Law Firm website.

---

## 🔒 Client-Side Security (Frontend)

### Input Sanitization
All user inputs are sanitized to prevent XSS (Cross-Site Scripting) attacks:
- Dangerous characters (`<`, `>`, `"`, `'`) are HTML-encoded
- Input length is limited to 500 characters
- All input is trimmed and validated before processing

### Location: `src/components/Chatbot.js`
```javascript
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";
  return input
    .replace(/[<>\"']/g, (char) => {
      const map = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" };
      return map[char];
    })
    .trim()
    .slice(0, 500);
};
```

---

## ⚠️ CRITICAL: Server-Side Validation (Backend)

### **NEVER trust client-side validation alone!**

All user inputs MUST be re-validated and sanitized on the server. Client-side sanitization is **only** a user experience enhancement.

### Required Server-Side Checks

1. **Input Type Validation**
   - Verify input is string/expected type
   - Check content length (max 500 chars)
   - Validate format (email, phone, etc.)

2. **SQL Injection Prevention**
   - Use parameterized queries / prepared statements
   - **NEVER** concatenate user input into SQL queries
   - Use an ORM or query builder

   ❌ **DON'T:**
   ```sql
   SELECT * FROM users WHERE email = '" + userInput + "'
   ```

   ✅ **DO:**
   ```javascript
   db.query("SELECT * FROM users WHERE email = ?", [userEmail])
   ```

3. **XSS Prevention**
   - Escape HTML entities in all outputs
   - Use templating engines that auto-escape
   - Set Content-Security-Policy headers
   - Validate against a whitelist of allowed content

4. **CSRF Protection**
   - Use CSRF tokens for state-changing operations (POST, PUT, DELETE)
   - Validate `Origin` and `Referer` headers
   - Use SameSite cookies

5. **Rate Limiting**
   - Implement rate limiting on API endpoints
   - Limit chatbot messages (e.g., 10 requests per minute)
   - Block suspicious patterns (rapid-fire requests)

6. **Authentication & Authorization**
   - Verify user identity before processing sensitive data
   - Use JWT tokens or secure sessions
   - Never store passwords in plain text (use bcrypt, Argon2, etc.)

---

## 📋 Implementation Examples

### Node.js/Express Backend

```javascript
// Middleware for input sanitization
const validator = require('validator');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');

// CSRF Protection
app.use(csrf());

// Rate Limiting
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute
  message: "Too many messages sent, please try again later."
});

// Input validation endpoint
app.post('/api/chat', chatLimiter, (req, res) => {
  const { message } = req.body;

  // Step 1: Check if message exists and is string
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  // Step 2: Length validation
  if (message.length > 500 || message.length === 0) {
    return res.status(400).json({ error: 'Message too long or empty' });
  }

  // Step 3: Sanitize (server-side)
  const sanitized = validator.trim(validator.escape(message));

  // Step 4: Additional validation
  if (!validator.isLength(sanitized, { min: 1, max: 500 })) {
    return res.status(400).json({ error: 'Invalid message length' });
  }

  // Step 5: Process safe input
  const response = processChatMessage(sanitized);
  res.json({ success: true, message: response });
});
```

### Python/Flask Backend

```python
from flask import Flask, request, jsonify
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from markupsafe import escape
import re

app = Flask(__name__)
limiter = Limiter(app=app, key_func=get_remote_address, default_limits=["10 per minute"])

@app.route('/api/chat', methods=['POST'])
@limiter.limit("10 per minute")
def chat():
    data = request.get_json()
    message = data.get('message', '')

    # Step 1: Type & existence check
    if not isinstance(message, str):
        return jsonify({'error': 'Invalid input type'}), 400

    # Step 2: Length validation
    if len(message) > 500 or len(message) == 0:
        return jsonify({'error': 'Message too long or empty'}), 400

    # Step 3: Sanitize
    sanitized = escape(message.strip())

    # Step 4: Additional validation (regex for format if needed)
    if not re.match(r'^[a-zA-Z0-9\s\?\.\,\!\-\']*$', message):
        return jsonify({'error': 'Invalid characters in message'}), 400

    # Step 5: Process
    response = process_chat(sanitized)
    return jsonify({'success': True, 'message': response}), 200
```

---

## 🔐 Security Headers

The following headers are configured in `vercel.json`:

| Header | Purpose |
|--------|---------|
| `X-Content-Type-Options: nosniff` | Prevent MIME sniffing |
| `X-Frame-Options: SAMEORIGIN` | Prevent clickjacking |
| `X-XSS-Protection: 1; mode=block` | Enable XSS filter |
| `Referrer-Policy` | Control referrer information |
| `Content-Security-Policy` | Restrict script/resource sources |
| `Permissions-Policy` | Disable unnecessary features |

---

## 📦 Dependencies for Backend Security

### Node.js
```bash
npm install express-validator express-rate-limit helmet csrf
```

### Python
```bash
pip install flask-limiter markupsafe email-validator
```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All environment variables are set (API URLs, secrets)
- [ ] HTTPS/TLS is enforced
- [ ] Rate limiting is configured
- [ ] CSRF tokens are enabled
- [ ] Input validation runs on server
- [ ] Secrets are not hardcoded
- [ ] Security headers are set
- [ ] Database is using parameterized queries
- [ ] Logs do not contain sensitive data
- [ ] Regular security audits are scheduled

---

## 🧪 Testing Security

### Test Client-Side Sanitization
```javascript
// Should be escaped
console.log(sanitizeInput("<script>alert('XSS')</script>"));
// Output: &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;
```

### Test Backend Rate Limiting
```bash
for i in {1..15}; do
  curl -X POST http://localhost:3001/api/chat -d '{"message":"test"}'
done
# Should return 429 (Too Many Requests) after 10 attempts
```

---

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Flask Security](https://flask.palletsprojects.com/en/latest/security/)

---

## 📞 Support

For security questions or to report vulnerabilities, contact: security@sofoworalaw.com

**Last Updated:** December 6, 2025
