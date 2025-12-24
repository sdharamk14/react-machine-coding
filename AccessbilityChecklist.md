# 📝 HTML Accessibility Checklist (Priority Color-Coded)

**Legend:**  
- 🔴 **High Priority** – Must fix for basic accessibility  
- 🟡 **Medium Priority** – Important for better usability  
- 🟢 **Low Priority** – Optional enhancements  

| HTML Tag | Accessibility Checklist |
|----------|------------------------|
| `<img>` | 🔴 Provide meaningful `alt` text.<br>🟡 Use `<figure>` + `<figcaption>` for long descriptions.<br>🔴 Use `alt=""` for purely decorative images.<br>🟢 Avoid using images of text. |
| `<a>` | 🔴 `href` must be present.<br>🔴 Descriptive link text (avoid "click here").<br>🟡 Ensure visible focus styles.<br>🟢 Use `aria-label` if visual text is insufficient. |
| `<button>` | 🔴 Use for actions (avoid `<div>`/`<span>` as buttons).<br>🔴 Include descriptive text.<br>🟡 Add `aria-label` for icon-only buttons.<br>🔴 Ensure keyboard accessibility. |
| `<input>` / `<textarea>` / `<select>` | 🔴 Associate with `<label>`.<br>🟡 Provide placeholders + instructions (not as sole label).<br>🔴 Mark required fields with `required`.<br>🔴 Provide accessible error messages.<br>🟢 Use appropriate input types (`email`, `tel`, etc.). |
| `<label>` | 🔴 Always linked to form control.<br>🔴 Text must be visible and descriptive.<br>🟢 Avoid icon-only labels. |
| `<fieldset>` + `<legend>` | 🟡 Use for related inputs.<br>🔴 `<legend>` clearly describes group.<br>🟢 Avoid overly long legend text. |
| `<table>` | 🔴 Use `<th>` with `scope`.<br>🔴 Add `<caption>` describing table.<br>🟡 Avoid using tables for layout.<br>🟢 Use `headers` and `id` for complex tables. |
| `<nav>` | 🔴 Wrap main menus in `<nav>`.<br>🟡 Use `aria-label` for multiple navs.<br>🟢 Provide "skip to content" links. |
| `<header>` / `<main>` / `<footer>` / `<section>` / `<article>` | 🔴 Use semantic structure.<br>🔴 Only one `<main>` per page.<br>🟡 Include headings inside sections.<br>🟢 `<article>` for standalone content. |
| `<h1>`–`<h6>` | 🔴 Follow logical order.<br>🔴 Only one `<h1>` per page.<br>🔴 Headings describe section content.<br>🟢 Avoid skipping levels. |
| `<ul>` / `<ol>` / `<li>` | 🔴 Use proper list elements.<br>🟡 Ensure items are related.<br>🟢 Avoid excessive nesting. |
| `<video>` / `<audio>` | 🔴 Provide captions, transcripts, or audio descriptions.<br>🟡 Avoid autoplay; allow controls.<br>🔴 Include built-in controls. |
| `<svg>` | 🟡 Provide `<title>`/`<desc>` for meaningful icons.<br>🔴 Use `aria-hidden="true"` for decorative icons.<br>🟢 Ensure sufficient color contrast. |
| `<div>` / `<span>` | 🟡 Avoid as interactive elements; use semantic elements.<br>🔴 If used interactively, add `role`, `tabindex`, and keyboard support. |
| `<form>` | 🔴 Logical grouping of inputs.<br>🔴 Include submit button.<br>🟡 Use `aria-describedby` for instructions.<br>🔴 Provide clear error/success messages. |
| `<details>` + `<summary>` | 🟡 Use meaningful `<summary>`.<br>🔴 Ensure keyboard accessibility.<br>🟢 Avoid nesting complex interactive elements. |

---

## 📌 Notes
- Follow **WCAG 2.1 / 2.2** guidelines.  
- Test with **screen readers**, **keyboard-only navigation**, and automated tools like **axe** or **Lighthouse**.  
- Prioritize semantic HTML first; use ARIA roles only when necessary.  
- Color-coded priorities help developers focus on the most critical fixes first.
