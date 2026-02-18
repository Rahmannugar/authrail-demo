# AuthRail Demo

A premium, fully interactive demonstration of **AuthRail**—the declarative policy engine for React applications. This demo showcases how to enforce authentication, role-based access control (RBAC), and custom business logic with a clean, deterministic API.

[![npm version](https://img.shields.io/npm/v/authrail.svg?style=flat-square)](https://www.npmjs.com/package/authrail)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Rahmannugar/auth-rail.svg?style=social)](https://github.com/Rahmannugar/auth-rail)

---

## Quick Links

- **NPM Package:** [authrail](https://www.npmjs.com/package/authrail)
- **Source Code:** [Rahmannugar/auth-rail](https://github.com/Rahmannugar/auth-rail)
- **Bug Reports:** [GitHub Issues](https://github.com/Rahmannugar/auth-rail/issues)

---

## Features Demonstrated

- **Authentication Enforcement:** Deterministic redirection for unauthenticated users.
- **Role-Based Authorization:** Granular access control based on user roles (Admin vs. User).
- **Context-Driven Policies:** Real-time evaluation of business rules using `blockIf` and `allowIf`.
- **Deterministic Middleware:** Predictable execution order with early-exit logic.
- **Component Protection:** Non-intrusive protection using `RailBoundary` and `protect()` helpers.
- **Debug Logging:** Built-in transparency for policy decisions.

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/Rahmannugar/auth-rail.git
cd auth-rail
npm install
```

### 2. Launch

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

---

## Testing Scenarios

### 1. Unauthenticated Access

- **Action:** Try to visit `/dashboard` or `/admin` directly.
- **Expected:** Immediate redirect to `/login`.
- **Logic:** Handled by `requireAuth("/login")` in both rails.

### 2. User vs. Admin Access

- **Action:** Login as a **User** (`user@demo.com`) and try to visit the **Admin Portal**.
- **Expected:** Access denied.
- **Logic:** `adminRail` requires `role: "admin"`.

### 3. Dynamic Policy Toggling

- **Dashboard Blocking:** While logged in, toggle **"Block Dashboard"**. The UI will reactively switch to the denied state.
- **Admin Clearance:** Login as **Admin** and toggle **"Grant Admin Clearance"**. This demonstrates how `allowIf` can dynamically override or supplement access.

### 4. Deterministic Debugging

Open the browser console to see the "Rail" execution flow:

```text
[AuthRail:admin] → requireAuthMiddleware
[AuthRail:admin] → requireRoleMiddleware
[AuthRail:admin] decision → allow
```

---

## Structure

```text
src/
├── lib/
│   ├── auth/         # Auth context & state management
│   ├── rails/        # AuthRail definitions (authRail, adminRail)
│   └── mock/         # Mock database & user data
└── pages/            # View components protected by RailBoundary
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

Developed with by [Rahman Nugar](https://github.com/Rahmannugar).
