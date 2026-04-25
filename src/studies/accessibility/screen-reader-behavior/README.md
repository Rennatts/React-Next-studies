# Screen reader behavior

Screen readers don’t “look at pixels”. They read the **accessibility tree**: a semantic representation of your UI built from:

- native HTML semantics (best source)
- ARIA roles + properties (`role`, `aria-*`)
- text alternatives (accessible name / description)
- focus and state changes

If your UI is keyboard-accessible and semantically correct, it becomes much more screen-reader friendly.

## What screen readers announce (roughly)

Most announcements are combinations of:

- **Role**: button, link, heading, navigation, dialog, textbox…
- **Name**: the label the user hears (text content, `aria-label`, or `aria-labelledby`)
- **State/value**: pressed, expanded, invalid, selected, current, value, etc.

Example:

- “Close dialog, button”
- “Enabled, toggle button, pressed”

## Reading order vs focus order

Two different “paths” matter:

- **Reading order**: what a user hears when navigating content (often aligned to DOM order and landmarks/headings).
- **Focus order**: what Tab/Shift+Tab visits.

Good practice:

- keep DOM order aligned with visual order
- keep focusable elements in a predictable sequence

Related:

- [Keyboard navigation](../keyboard-navigation/README.md)

## Accessible name: the most common bug

If a control has no accessible name, a screen reader may announce it as:

- “button” (no name)
- or worse: a confusing fallback

Patterns:

- Prefer visible text: `<button>Save</button>`
- For icon-only controls: add `aria-label`
- For custom labeling: use `aria-labelledby` referencing an element id

## Descriptions: hints and errors

Use `aria-describedby` to attach helper text or error text to a field/control.

- Name answers: “What is this?”
- Description answers: “What do I need to know?”

## Live regions (announcements without moving focus)

When UI changes without navigation (background save, validation summary, toast), use live regions carefully:

- `role="status"` / `aria-live="polite"` for non-urgent updates
- `role="alert"` / `aria-live="assertive"` for urgent errors

Rules of thumb:

- Don’t spam announcements (avoid announcing on every keystroke)
- Update text content, don’t re-mount regions unnecessarily
- Prefer moving focus for truly critical changes (e.g. open a dialog)

## The demo in this folder

- `ScreenReaderBehaviorDemo.tsx` shows:
  - accessible name patterns (visible text vs `aria-label` vs `aria-labelledby`)
  - `aria-describedby` helper text
  - `role="status"` and `role="alert"` live region announcements

## Related in this repo

- [ARIA roles](../aria-roles/README.md) — role/name/state basics.  
- [Keyboard navigation](../keyboard-navigation/README.md) — focus behavior is foundational for SR users.  

## Try it

Open `/studies/accessibility/screen-reader-behavior`.

