AuthRail Demo

A fully functional demo application showcasing AuthRail in a real routing environment.

This project demonstrates:

Authentication enforcement

Role-based authorization

Context-driven policy rules

Redirect handling

Component-level protection

Deterministic middleware execution

What This Demo Shows

This application includes:

Login as user or admin

Protected dashboard route

Protected admin route

Toggleable policy rules using blockIf and allowIf

Redirect behavior

Deny rendering

Debug logging

It tests both:

RailBoundary

protect() helper

Tech Stack

React 19

React Router

AuthRail

TypeScript

Vite

Getting Started
git clone https://github.com/your-username/authrail-demo
cd authrail-demo
npm install
npm run dev


Open:

http://localhost:5173

Demo Structure
src/
  lib/
    auth/
      authStore.tsx
    rails/
      authRail.ts
      adminRail.ts
      types.ts
    mock/
      db.ts
  pages/
    Home.tsx
    Login.tsx
    Dashboard.tsx
    Admin.tsx

Policies Implemented
authRail
requireAuth("/login")
blockIf(ctx => ctx.blockDashboard === true)


Tests:

Redirect when unauthenticated

Conditional deny based on context flag

adminRail
requireAuth("/login")
requireRole("admin")
allowIf(ctx => ctx.allowAdmin === true)


Tests:

Authentication enforcement

Role enforcement

Conditional access rule

What to Test
1. Unauthenticated Access

Visit /dashboard

Visit /admin

Confirm redirect to /login

2. User Access

Login as regular user

Visit /dashboard → allowed

Visit /admin → denied

3. Admin Access

Login as admin

Visit /admin

Toggle allowAdmin

Confirm deny/allow behavior

4. Dashboard Blocking

Login as user

Toggle blockDashboard

Confirm dashboard deny behavior

5. Logout From Protected Route

Logout while on /dashboard

Confirm redirect occurs immediately

6. Debug Logging

Both rails have debug: true enabled.

Observe deterministic middleware execution in console:

[AuthRail:admin] → requireAuthMiddleware
[AuthRail:admin] → requireRoleMiddleware
[AuthRail:admin] decision → allow


Execution stops at first decision.