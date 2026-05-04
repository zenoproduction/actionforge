/**
 * ActionForge — Interactive Demo
 *
 * Handles mode selection and generates mock output based on the selected mode.
 * No external APIs are called. All output is pre-written and injected client-side.
 *
 * Each generator function receives the raw textarea string and returns a
 * realistic-looking plan that mirrors what real ActionForge output looks like.
 */

'use strict';

/* ============================================================
   Mock output generators — one per mode
   ============================================================ */

const generators = {

  auto(input) {
    return `## Execution Plan

Input interpreted as: idea
Scope: SaaS product for tracking QR code scan analytics.

---

### Problem
Businesses using QR codes in marketing (print, OOH, events) have no reliable way
to measure scan volume, device type, or location — making campaign ROI invisible.

### Target users
- Marketing managers at SMBs running physical campaigns
- Event organizers distributing codes on badges and signage
- Agencies managing campaigns for multiple clients

### Core value
Create a QR code. Get a redirect URL. See every scan with timestamp, device,
and location. No guessing.

### MVP scope (in)
- QR code creation with a target URL
- Unique redirect URL per code
- Scan event logging (timestamp, user-agent, IP/geo)
- Dashboard: scans per day, device breakdown

### MVP scope (out)
- Custom QR design / branding
- Team workspaces
- API access
- White-label

### First tasks
- [ ] Define the data model: qr_codes + scan_events schema
- [ ] Build QR create endpoint (POST /api/qr) and redirect handler (GET /r/:slug)
- [ ] Implement scan event logging — async, non-blocking redirect
- [ ] Build dashboard: total scans, scans/day line chart, top devices
- [ ] Add auth (email + password, JWT) before storing any user data

### Risks
- Free QR tools exist — validate willingness to pay before writing code
- Bot traffic inflates scan counts — add user-agent filtering from day one

---

Assumptions made:
- Web app (not mobile-first)
- PostgreSQL for event storage
- No real-time requirement for v1 (dashboard updates every 60s is fine)

Open questions:
- Is the target user creating codes themselves, or importing existing ones?`;
  },

  dev(input) {
    return `## Development Plan: QR Code Analytics SaaS

Input interpreted as: idea
Mode: dev
Scope: Web app — QR code creation, scan tracking, analytics dashboard.

---

### Affected systems
- Backend API: Node.js + Express (or FastAPI if Python preferred)
- Database: PostgreSQL (events) + Redis (caching + rate limiting)
- Frontend: React + Recharts for dashboard charts
- QR generation: server-side PNG via the "qrcode" npm package
- Redirect service: lightweight, high-performance handler (separate process)

### Dependencies & prerequisites
- [ ] Choose and scaffold tech stack (monorepo with pnpm workspaces recommended)
- [ ] Provision database (Supabase or Railway for quick start)
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Configure environment variable management (.env + doppler/vault)

### Implementation steps

1. Database schema
   Table: qr_codes  (id, user_id, target_url, slug, created_at)
   Table: scan_events (id, qr_code_id, scanned_at, ip, user_agent,
                       country, device_type)
   Index: scan_events(qr_code_id, scanned_at DESC)

2. QR creation endpoint
   POST /api/qr — validate URL, generate slug, store record, return QR PNG URL
   Generate image on the fly with "qrcode" (avoid S3 cost for v1)

3. Redirect + scan tracking
   GET /r/:slug — lookup code, 301 redirect, log event via setImmediate()
   Target: redirect responds in < 80ms (p99), regardless of logging

4. Analytics aggregation
   Materialized view (hourly cron): scans_by_day, scans_by_device, scans_by_country
   Expose via GET /api/qr/:id/stats

5. Dashboard UI
   QR code list with scan count badges
   Per-code: line chart (30 days), device doughnut, country table (Recharts)

6. Auth
   Email + password with bcrypt
   JWT access token (15min) + refresh token (30d, httpOnly cookie)

### Edge cases & failure modes
- Bot/crawler traffic: filter by user-agent blocklist on scan event creation
- High scan spikes: buffer events via BullMQ; process async
- QR code not found: return 404 with branded error page — never a 500
- Redirect service down: circuit breaker fallback still completes the redirect

### Acceptance criteria
- [ ] POST /api/qr returns a scannable QR image in < 500ms
- [ ] GET /r/:slug redirects in < 100ms (p99) regardless of logging
- [ ] Dashboard scan data appears within 60s of actual scan
- [ ] Bot user-agents do not create scan_events rows

### Complexity: L
Estimated: 3–4 weeks for a solo developer to a working v1.`;
  },

  product(input) {
    return `## Product Spec: QR Code Analytics SaaS

Input interpreted as: idea
Mode: product
Scope: SaaS for marketers to create and track QR codes with analytics.

---

### Target personas

Primary — Marketing Manager (Maya)
Runs 3–5 campaigns/quarter with physical materials (flyers, posters, events).
Needs to report scan volume to leadership. Currently using Bitly with no QR
analytics.

Secondary — Agency Account Manager (Alex)
Manages campaigns for 10+ clients. Needs per-client analytics and branded codes.

---

### User stories

As Maya, I want to create a trackable QR code in under 2 minutes
  so I can include it in tomorrow's print run without blocking production.

As Maya, I want to see how many times my QR code was scanned per day
  so I can measure campaign engagement and report it to leadership.

As Alex, I want separate QR codes per client with per-client analytics
  so I can include them in my monthly agency reports.

---

### Feature priority (MoSCoW)

| Feature                        | Priority | Rationale                        |
|-------------------------------|----------|----------------------------------|
| QR code creation with URL     | Must     | Core function                    |
| Scan count + 30-day chart     | Must     | Core value                       |
| Device breakdown              | Must     | Marketers always ask for this    |
| CSV export                    | Should   | Needed for reporting workflows   |
| Custom QR design / branding   | Should   | Differentiator vs free tools     |
| Team workspaces               | Could    | Unlocks agency segment           |
| API access                    | Won't v1 | Enterprise — build post-revenue  |

---

### Acceptance criteria (v1)

- Given a logged-in user, when they enter a valid URL and click Create,
  then a QR code is generated and displayed within 3 seconds.

- Given a scanned QR code, when the user views the dashboard,
  then scan data appears within 60 seconds of the actual scan.

- Given a user with multiple QR codes, when they view the dashboard,
  then each code shows a scan count and a 30-day sparkline.

---

### Success metrics (90-day targets)
- Time to first QR code created: < 2 minutes
- D7 retention: > 40%
- Codes created per active user: > 3
- NPS (after 30 days): > 40

---

Assumptions made:
- Primary delivery: web app
- v1 targets individual users before teams
- Scan volume is the primary metric (not heatmaps or click maps)`;
  },

  startup(input) {
    return `## MVP Plan: QR Code Analytics SaaS

Input interpreted as: idea
Mode: startup
Scope: Trackable QR codes for marketers who need to prove offline campaign ROI.

---

### Riskiest assumption — validate BEFORE building

Marketers will pay $19/mo for QR analytics when free alternatives
(Bitly, QR code generators) already partially cover the need.

How to validate:
  Send 10 cold LinkedIn DMs to marketing managers at SMBs.
  Offer a 3-month free trial in exchange for a 20-minute call.
  3 out of 10 "yes" responses → build.
  0 out of 10 → reposition or find a different buyer.

Do not write a line of code until this is done.

---

### ICP (Ideal Customer Profile)
Marketing managers at SMBs (10–200 employees) running physical campaigns
where offline-to-online conversion is measured. Currently frustrated by
zero analytics on their printed QR codes.

---

### Revenue model

Freemium:
  Free   → 3 QR codes, basic scan count only
  Pro    → $19/mo — unlimited codes, full analytics, CSV export
  Agency → $79/mo — 10 seats, client workspaces, white-label

Do not build the Agency tier until 5 Pro customers ask for it.

---

### What to cut from v1
- Custom QR design / branding (add after first 50 users)
- Team collaboration (add when an agency customer requests it)
- API access (add when a developer customer requests it)
- Mobile app (web-first, full stop)
- Integrations (Zapier, HubSpot) — add post-PMF

---

### First 10 customers strategy
1. Post in r/marketing: "I built a QR analytics tool — roast it"
2. List on Product Hunt (prepare the launch; don't rush it)
3. Cold outreach to 50 local businesses running print ads
4. Offer 3 months free to first 10 users in exchange for a 30-min call
5. Find 2 agency owners willing to test with a real client campaign

---

### First tasks (in order — do not skip step 1)
- [ ] Validate with 10 potential customers (calls/DMs) — zero code written yet
- [ ] Build a waitlist landing page (Framer or Carrd, 2 hours max)
- [ ] Set up Stripe BEFORE acquiring your first user — revenue readiness first
- [ ] Build MVP: QR create + redirect + scan count only
- [ ] Launch to waitlist; get 5 paying users before adding any new features

---

Assumptions made:
- Solo founder or 2-person team
- Infra budget: < $500/mo until first $1k MRR
- No paid ads in v1 — distribution is manual and community-driven`;
  },

  debug(input) {
    return `## Debug Plan: QR Analytics — Inflated Scan Counts

Input interpreted as: bug (debug mode applied to QR analytics context)
Mode: debug

---

### Symptom
Scan counts shown on the dashboard are higher than expected. Some codes show
scans even when no real user has physically scanned them. Counts do not match
what the customer reports from their campaign.

---

### Hypotheses

1. Bot/crawler traffic counted as real scans (confidence: 75%)
   Link previews (Slack, iMessage, WhatsApp) and search engine crawlers hit
   the redirect URL without a real human behind the scan. User-agent filtering
   is missing or incomplete.

2. Scan event written multiple times per request (confidence: 55%)
   The async logging job is retrying on failure and creating duplicate rows
   without a uniqueness constraint.

3. Dashboard cache serving stale or incorrect aggregates (confidence: 40%)
   The cached scan count includes deleted/test codes and is not invalidated
   when a code is deleted.

4. Internal health checks hit the redirect endpoint (confidence: 30%)
   Uptime monitoring (UptimeRobot, Pingdom) or load balancer probes are
   hitting /r/:slug and being logged as legitimate scans.

---

### Reproduction steps
1. Create a new QR code pointing to any URL
2. Do NOT scan it from any device
3. Wait 10 minutes, then check the scan count
4. If count > 0 → bot/crawler traffic confirmed

---

### Diagnostic checks
- [ ] Log the user-agent for every scan event in the last 24h — sort by frequency
- [ ] Check if /r/:slug appears in any external health check configuration
- [ ] Query raw scan_events table and compare count to dashboard displayed count
- [ ] Add verbose request logging to redirect handler: method, user-agent, IP, ts
- [ ] Check for a unique constraint on scan_events — if missing, add one

---

### Proposed fixes

For hypothesis 1 (bots):
  Maintain a blocklist of known bot user-agents.
  Reject scan event creation for any matching request.
  Reference: github.com/monperrus/crawler-user-agents (open source list)

For hypothesis 2 (duplicate writes):
  Add a unique constraint: scan_events(request_id) where request_id is a UUID
  generated at redirect time. Use INSERT ... ON CONFLICT DO NOTHING.

For hypothesis 3 (stale cache):
  Invalidate cached aggregates on QR code deletion.
  Set a hard TTL of 60 seconds on all scan count keys.

---

### Regression prevention
- [ ] Test: bot user-agent to /r/:slug → no scan_events row created
- [ ] Test: 5 sequential scans → exactly 5 events in DB (no duplicates)
- [ ] Monitor: alert if insert rate for a single code exceeds 10× its baseline`;
  },

  ai(input) {
    return `## AI Architecture: Intelligence Layer for QR Analytics SaaS

Input interpreted as: idea
Mode: ai
Scope: AI/ML features layered on top of a QR code analytics platform.

---

### Model roles (two distinct capabilities)

1. Natural language query interface
   Users ask: "How did my summer campaign perform vs. last quarter?"
   System returns a plain-language answer backed by real database data.

2. Anomaly detection
   System detects unusual scan patterns (spike, sustained drop, bot surge)
   and alerts the user with a plain-language explanation.

---

### Input / output contract

NL Query Interface:
  Input:  User question (string) + DB schema context + 90-day scan aggregates
  Output: Plain-language answer + supporting SQL (shown for transparency)

Anomaly Detection:
  Input:  Time-series scan data per code (hourly buckets, rolling 30 days)
  Output: Label (spike / drop / bot-surge / none) + confidence + explanation

---

### Data flow & pipeline

1. Scan events → PostgreSQL (raw)
2. Hourly cron job → qr_stats_hourly materialized view
3. NL query path:
     user question → Claude API → SQL generation → query execution → answer
4. Anomaly path:
     cron (every 6h) → Z-score on hourly buckets → flag anomalies
     → anomaly_alerts table → user notification

---

### Prompt architecture (NL query)

System prompt:
  - Database schema (tables, columns, types) in token-efficient format
  - Last 7-day summary stats per QR code
  - Hard constraint: only SELECT statements are permitted

User turn: plain-language question

Output format: { "sql": "...", "answer": "..." }

Validate SQL syntax and dry-run EXPLAIN before execution.
Reject any non-SELECT statement at the application layer.

---

### Evaluation criteria

| Metric              | Target | Method                                      |
|--------------------|--------|---------------------------------------------|
| NL-to-SQL accuracy | > 90%  | 50 hand-labeled Q&A pairs test set          |
| Anomaly precision  | > 80%  | Backtest on historical data w/ known events |
| Query latency p99  | < 2s   | End-to-end including Claude API call        |
| Hallucinated SQL   | < 1%   | Syntax validation + dry-run EXPLAIN         |

---

### Failure modes & mitigations

| Failure                        | Mitigation                                          |
|-------------------------------|-----------------------------------------------------|
| Hallucinated SQL mutates data  | DB role with SELECT-only permissions                |
| Context overflow on large DBs  | Limit schema to top 20 tables by query frequency   |
| Anomaly alert fatigue          | Suppress for codes with < 20 scans/day             |
| NL answer is confidently wrong | Always show SQL alongside answer for verification  |

---

### Model selection & cost estimates

NL query: Claude Haiku 4.5
  Input:  ~1,500 tokens (schema + question)
  Output: ~200 tokens
  Cost:   ~$0.0009/query
  Latency: ~400ms

Anomaly detection: rule-based (Z-score) with no LLM cost.
Upgrade to Claude-generated explanations only when anomaly is detected.

Monthly estimate at 10,000 NL queries: ~$9.

---

Assumptions made:
- PostgreSQL as the analytics database
- Claude API access via Anthropic SDK
- Anomaly detection runs in batch (not real-time stream)`;
  },

  jira(input) {
    return `Issue type: Epic
Title: QR Code Analytics SaaS — v1 Launch
Priority: High
Labels: saas, analytics, qr-code, v1

Description:
Build and launch a web SaaS that allows users to create trackable QR codes
and view scan analytics. v1 targets marketing managers and small business
owners who need to measure the effectiveness of offline campaigns.
Core value: create a code, share it, see every scan.

═══════════════════════════════════════════════════════════════

Issue type: Story
Title: QR code creation and management
Epic: QR Code Analytics SaaS — v1 Launch
Priority: High
Story points: 5
Labels: backend, frontend, core
Sprint: Sprint 1

Description:
Users can create trackable QR codes by entering a target URL. Each code
gets a unique redirect slug and a downloadable QR image.

Acceptance Criteria:
  Given a logged-in user,
  When they enter a valid URL and click Create,
  Then a QR code PNG is generated and displayed within 3 seconds.

  Given an invalid URL,
  When the user submits the form,
  Then they see an inline validation error and no code is created.

  Given an existing code,
  When the user views the dashboard,
  Then they can copy the redirect URL and download the QR PNG.

Sub-tasks:
  - [ ] POST /api/qr endpoint with URL validation
  - [ ] Server-side QR PNG generation (qrcode npm package)
  - [ ] Dashboard: QR code list with thumbnail and redirect URL copy

═══════════════════════════════════════════════════════════════

Issue type: Story
Title: Scan tracking and redirect
Epic: QR Code Analytics SaaS — v1 Launch
Priority: Highest
Story points: 3
Labels: backend, core, performance
Sprint: Sprint 1

Description:
Each redirect URL logs a scan event (timestamp, user-agent, IP, derived
country and device type) without blocking the redirect response. Known bot
traffic is filtered and does not create scan events.

Acceptance Criteria:
  Given a real user scanning a QR code,
  When the redirect URL is hit,
  Then the user is redirected in < 100ms and a scan event is logged async.

  Given a request with a known bot user-agent (Googlebot, Slackbot, etc.),
  When the redirect URL is hit,
  Then the user is redirected but no scan event is created.

  Given a slug that does not exist,
  When the redirect URL is hit,
  Then the user sees a branded 404 page (not a 500).

Sub-tasks:
  - [ ] GET /r/:slug redirect endpoint
  - [ ] Async scan event logging (BullMQ or setImmediate)
  - [ ] Bot user-agent blocklist middleware
  - [ ] Branded 404 page for unknown slugs

═══════════════════════════════════════════════════════════════

Issue type: Story
Title: Analytics dashboard
Epic: QR Code Analytics SaaS — v1 Launch
Priority: High
Story points: 8
Labels: frontend, analytics
Sprint: Sprint 2

Description:
Users can view scan analytics per QR code: total scans, scans per day
(30-day line chart), device type breakdown, and top countries.

Acceptance Criteria:
  Given a code with scan events,
  When the user opens the analytics view,
  Then they see total scans, a 30-day chart, device breakdown, country list.

  Given a code with no scans,
  When the user opens the analytics view,
  Then they see an empty state with instructions to share the QR code.

  Given new scan events,
  When the user refreshes the dashboard,
  Then updated data appears within 60 seconds.

Sub-tasks:
  - [ ] GET /api/qr/:id/stats endpoint
  - [ ] Hourly aggregation cron job (materialized view)
  - [ ] Line chart component (30 days, Recharts)
  - [ ] Device doughnut chart
  - [ ] Country table with flag and scan count`;
  },

};

/* ============================================================
   DOM wiring
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const modeButtons = document.querySelectorAll('.mode-btn');
  const forgeBtn    = document.getElementById('forge-btn');
  const textarea    = document.getElementById('demo-input');
  const outputEl    = document.getElementById('output-content');
  const badgeEl     = document.getElementById('output-badge');

  let activeMode = 'auto';

  /* --- Mode selection --- */
  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      activeMode = btn.dataset.mode;
    });
  });

  /* --- Forge Plan --- */
  forgeBtn.addEventListener('click', forge);
  textarea.addEventListener('keydown', e => {
    // Ctrl+Enter / Cmd+Enter submits
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) forge();
  });

  function forge() {
    const input = textarea.value.trim();

    if (!input) {
      textarea.classList.add('error');
      textarea.focus();
      setTimeout(() => textarea.classList.remove('error'), 900);
      return;
    }

    // Loading state
    forgeBtn.textContent = '⚡ Forging…';
    forgeBtn.disabled    = true;
    outputEl.textContent = 'Generating plan…';
    badgeEl.textContent  = `mode: ${activeMode}`;

    // Simulate async processing (600ms feels realistic without being slow)
    setTimeout(() => {
      const generate = generators[activeMode] || generators.auto;
      outputEl.textContent = generate(input);
      outputEl.scrollTop   = 0;

      forgeBtn.textContent = '⚡ Forge Plan';
      forgeBtn.disabled    = false;
    }, 620);
  }
});
