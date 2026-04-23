# Controlled vs uncontrolled components (React)

In React, “controlled vs uncontrolled” usually refers to **form elements** (inputs, selects, textareas).

## Idea in one sentence

- **Controlled**: React state is the **source of truth** (value comes from state, updates via `onChange`).
- **Uncontrolled**: the DOM is the **source of truth** (you read values from the input when needed, often via a `ref`).

Both are valid. Pick based on whether you need React to *continuously* know the current value.

## Controlled components

Use controlled inputs when you need:

- **Live validation** (show errors while typing)
- **Conditional UI** (disable buttons, show derived data)
- **Formatting / masking** (currency, phone, uppercasing)
- **Single source of truth** shared across components

Typical shape:

```tsx
const [name, setName] = useState("");
return <input value={name} onChange={(e) => setName(e.target.value)} />;
```

Trade-offs:

- More React renders (usually fine)
- You must handle the state lifecycle (default values, resets)

## Uncontrolled components

Use uncontrolled inputs when you want:

- A **simple form** where you only need the value **on submit**
- To integrate with **native form behavior** or certain third‑party libs
- To avoid wiring every field into React state

Typical shape:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// later...
const value = inputRef.current?.value ?? "";
```

Trade-offs:

- Harder to do live validation/formatting
- React state won’t automatically reflect the current input value

## The real world: hybrids

It’s common to mix approaches:

- Uncontrolled inputs + controlled “is form valid?” state
- Uncontrolled fields with `FormData` on submit
- Controlled for a few fields that need live behavior, uncontrolled for the rest

## Try it

Run the app and open `/studies/design-patterns/controlled-uncontrolled-components`.

