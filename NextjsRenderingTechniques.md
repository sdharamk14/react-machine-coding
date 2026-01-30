# Next.js Rendering Techniques: CSR, SSR, SSG, ISR, and PPR

Next.js provides multiple **rendering techniques** to balance **performance, SEO, scalability, and user experience**. Understanding when and how each rendering strategy works is critical for building production-ready applications.

This guide explains **CSR, SSR, SSG, ISR, and PPR** with clear explanations, examples, use cases, and interview questions.

---

## What Is Rendering in Next.js?

Rendering is the process of converting React components into HTML that the browser can display. Next.js supports **multiple rendering strategies** instead of forcing a single approach.

---

## 1. Client-Side Rendering (CSR)

### What Is CSR?

In **Client-Side Rendering**, the browser downloads a minimal HTML page and then renders content using JavaScript on the client.

### How CSR Works

1. Browser loads HTML shell
2. JavaScript bundle downloads
3. React renders UI in the browser
4. Data fetching happens on the client

### Example (CSR)

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data ? data.title : "Loading..."}</div>;
}
```

### Advantages

* Fast navigation after load
* Rich interactivity
* Simple data fetching

### Disadvantages

* Poor SEO (initially empty HTML)
* Slower first load
* Depends heavily on JavaScript

### Use Cases

* Dashboards
* Authenticated apps
* Admin panels

---

## 2. Server-Side Rendering (SSR)

### What Is SSR?

In **Server-Side Rendering**, HTML is generated on the **server for every request**.

### How SSR Works

1. Request sent to server
2. Server fetches data
3. HTML generated
4. Sent to browser
5. React hydrates the page

### Example (SSR)

```tsx
export default async function Page() {
  const res = await fetch("https://api.example.com/posts", { cache: "no-store" });
  const data = await res.json();

  return <div>{data.title}</div>;
}
```

### Advantages

* Excellent SEO
* Always fresh data
* Fast First Contentful Paint

### Disadvantages

* Slower TTFB
* Higher server load
* Not cached by default

### Use Cases

* User-specific pages
* Real-time dashboards
* Dynamic content

---

## 3. Static Site Generation (SSG)

### What Is SSG?

In **Static Site Generation**, pages are rendered **at build time** and served as static HTML.

### How SSG Works

1. Build runs
2. Pages generated as HTML
3. Deployed to CDN
4. Served instantly

### Example (SSG)

```tsx
export default async function Page() {
  const res = await fetch("https://api.example.com/posts");
  const data = await res.json();

  return <div>{data.title}</div>;
}
```

### Advantages

* Fastest performance
* Great SEO
* Minimal server cost

### Disadvantages

* Data can become stale
* Rebuild required for updates

### Use Cases

* Blogs
* Marketing pages
* Documentation sites

---

## 4. Incremental Static Regeneration (ISR)

### What Is ISR?

**ISR** allows static pages to be **updated after deployment** without rebuilding the entire site.

### How ISR Works

1. Page served from cache
2. After `revalidate` time, Next.js regenerates page
3. New page replaces old one

### Example (ISR)

```tsx
export default async function Page() {
  const res = await fetch("https://api.example.com/posts", {
    next: { revalidate: 60 }
  });

  const data = await res.json();
  return <div>{data.title}</div>;
}
```

### Advantages

* Combines SSG + SSR benefits
* Scalable
* SEO friendly

### Disadvantages

* Slightly stale data possible
* More complex caching logic

### Use Cases

* Product listings
* News websites
* E-commerce catalogs

---

## 5. Partial Prerendering (PPR)

### What Is PPR?

**Partial Prerendering (PPR)** allows parts of a page to be **static** while other parts are **dynamic**, streamed at runtime.

> Introduced in modern Next.js App Router for optimal performance.

### How PPR Works

* Static shell rendered at build time
* Dynamic sections fetched on request
* Page streams progressively

### Example (PPR)

```tsx
import { Suspense } from "react";

function DynamicContent() {
  return <div>Live Data</div>;
}

export default function Page() {
  return (
    <>
      <h1>Static Header</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <DynamicContent />
      </Suspense>
    </>
  );
}
```

### Advantages

* Best performance
* Fine-grained control
* Excellent UX

### Use Cases

* Dashboards
* Personalized content
* Mixed static + dynamic pages

---

## Rendering Strategy Comparison

| Technique | Render Time     | SEO       | Performance | Use Case      |
| --------- | --------------- | --------- | ----------- | ------------- |
| CSR       | Client          | Poor      | Medium      | Dashboards    |
| SSR       | Request time    | Excellent | Medium      | Dynamic pages |
| SSG       | Build time      | Excellent | Fastest     | Blogs         |
| ISR       | Build + runtime | Excellent | Fast        | Large sites   |
| PPR       | Mixed           | Excellent | Best        | Hybrid apps   |

---

## Commonly Asked Next.js Interview Questions

### 1. What is the default rendering in Next.js App Router?

Server Components with static rendering by default.

---

### 2. When should you use CSR?

When the page is highly interactive and SEO is not critical.

---

### 3. Difference between SSR and SSG?

SSR renders on every request, while SSG renders at build time.

---

### 4. What is ISR used for?

To update static pages after deployment without full rebuilds.

---

### 5. What is hydration?

The process of attaching JavaScript event listeners to server-rendered HTML.

---

### 6. How does PPR improve performance?

By prerendering static parts and streaming dynamic parts only when needed.

---

## One-Line Summary

**Next.js rendering techniques allow developers to choose the right balance between performance, SEO, and scalability for each page.**

---

---

## Rendering Flow Diagrams (ASCII)

### Client-Side Rendering (CSR)

```
User Request
     │
     ▼
HTML Shell
     │
     ▼
JS Bundle Download
     │
     ▼
React Renders UI in Browser
     │
     ▼
Content Visible & Interactive
```

---

### Server-Side Rendering (SSR)

```
User Request
     │
     ▼
Server Fetches Data
     │
     ▼
HTML Generated on Server
     │
     ▼
Browser Receives HTML
     │
     ▼
Hydration (JS attaches events)
```

---

### Static Site Generation (SSG)

```
Build Time
   │
   ▼
HTML Generated
   │
   ▼
Stored on CDN
   │
   ▼
User Request → Instant Response
```

---

### Incremental Static Regeneration (ISR)

```
User Request
   │
   ▼
Serve Cached Page
   │
   ▼
Revalidate in Background
   │
   ▼
New Page Generated
```

---

### Partial Prerendering (PPR)

```
Build Time
   │
   ▼
Static Shell Rendered
   │
   ▼
User Request
   │
   ▼
Dynamic Parts Streamed
```

---

## Next.js Data Caching Explained

Next.js controls rendering behavior using **fetch caching**.

---

### force-cache (Default)

* Response is cached
* Enables **SSG or ISR**
* Best for static data

```ts
const res = await fetch("https://api.example.com/posts", {
  cache: "force-cache"
});
```

**Real-Life Example:**
Blog posts that rarely change.

---

### no-store

* No caching
* Always fetches fresh data
* Enables **SSR**

```ts
const res = await fetch("https://api.example.com/profile", {
  cache: "no-store"
});
```

**Real-Life Example:**
User profile, dashboard, or live stock prices.

---

### revalidate (ISR)

```ts
const res = await fetch("https://api.example.com/products", {
  next: { revalidate: 120 }
});
```

**Real-Life Example:**
E-commerce product listing updated every few minutes.

---

## Server Components vs Client Components

Next.js App Router introduces **Server Components** by default.

---

## Server Components

### Characteristics

* Run on the server
* No JavaScript sent to browser
* Can access databases & secrets
* Better performance

```tsx
export default async function Page() {
  const data = await fetch("https://api.example.com/posts").then(r => r.json());
  return <div>{data.title}</div>;
}
```

**Real-Life Example:**
Fetching blog data or product catalog.

---

## Client Components

### Characteristics

* Run in the browser
* Required for interactivity
* Uses hooks (`useState`, `useEffect`)

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Real-Life Example:**
Buttons, modals, forms, charts.

---

## Server vs Client Components Comparison

| Feature           | Server Component | Client Component |
| ----------------- | ---------------- | ---------------- |
| Runs on           | Server           | Browser          |
| JS sent to client | ❌ No             | ✅ Yes            |
| Data fetching     | ✅ Yes            | ❌ Limited        |
| Interactivity     | ❌ No             | ✅ Yes            |
| Performance       | High             | Medium           |

---

## Choosing the Right Strategy (Real-Life Mapping)

| Scenario          | Best Approach           |
| ----------------- | ----------------------- |
| Blog website      | SSG + ISR               |
| News portal       | ISR                     |
| User dashboard    | SSR + Client Components |
| E-commerce home   | SSG + PPR               |
| Authenticated app | CSR + SSR               |

---

## Final One-Liner for Interviews

> **Next.js allows fine-grained control over rendering using caching, server/client components, and hybrid strategies like ISR and PPR.**

---

**Happy Building with Next.js 🚀**
