# Style composition in design systems

**Style composition** means building **larger visual behavior from smaller, named pieces**—tokens, utilities, layers, or variant maps—without copy-pasting magic values or fighting the cascade. It pairs with **encapsulation** (see [Reusability and encapsulating styles](../reusability-and-styles/README.md)): you compose **inside** a clear boundary so consumers stay on supported APIs.

## What “composition” means here

Not only “React composition” (children, slots)—here we mean **how CSS-like decisions stack**:

- **Token → token** — semantic colors reference primitives; spacing scales combine into layout rhythm.
- **Rule → rule** — base reset + component recipe + state modifiers, applied in a **predictable order**.
- **Variant → surface** — `size="md"` + `variant="primary"` resolves to a **known class set**, not ad-hoc strings per screen.

The design system’s job is to define **allowed combinations** and document **forbidden** ones (e.g. `danger` + `ghost` if that breaks contrast).

## Layers and ordering (CSS)

Modern CSS **cascade layers** (`@layer reset, tokens, components, utilities`) let teams **compose** without `!important` duels:

- **Lower layers** establish defaults (resets, token-backed base typography).
- **Higher layers** override for **component recipes** and **state** (hover, focus-visible).

Document the **layer order** in your system so product CSS does not accidentally sit in the wrong tier.

## Utility-first composition (e.g. Tailwind)

- **Primitives** — low-level utilities (`flex`, `gap-4`, `text-sm`).
- **Recipes** — repeated clusters moved to **`@layer components`** or small wrapper components so screens are not 80-class strings.
- **Design tokens** — map utilities to **semantic config** (`colors.primary`) so rebrand is config, not grep.

**Risk** — “utility soup” with no components: reuse **drops** because nothing is encapsulated behind a named primitive.

## Variant-driven composition (components)

Libraries often use a **variant map** (manually, or with helpers like **class-variance-authority**): each variant key picks a **curated** set of classes or CSS module fragments.

- **Compose variants** as **orthogonal axes** where possible: `size` × `variant` × `iconOnly`, with invalid pairs documented or impossible via types.
- **Avoid** composing by exporting raw `className` strings that bypass the variant contract.

## Slots and “style holes”

Composition across **regions** of a component (`header`, `body`, `footer`) is done with **named slots** or **subcomponents**, each with its own encapsulated styles. Optional **`className` / `style` escape hatches** should be **documented** as advanced so the system keeps a default quality floor.

## Token composition vs arbitrary values

- **Good** — `surface.card` = stack of spacing + radius + shadow tokens chosen by designers once.
- **Fragile** — arbitrary `padding: 13px` in product code because it “looked right once.”

Encourage **new tokens or variants** when a composition repeats, instead of one-off literals.

## Anti-patterns

- **Deep selector composition** from page into library internals (`Page .ds-dialog .ds-button`).
- **Mixing encapsulation models** in one subtree (half Modules, half global Tailwind overrides) without rules.
- **Composing states** only with color (no icon, no text change)—breaks a11y and theme contrast.

## Related topics

- [Reusability and encapsulating styles](../reusability-and-styles/README.md) — boundaries, Modules, tokens, leakage  
- [Key concepts](../key-concepts/README.md) — tokens and components in the wider system  
- [Example: Button](../button-example/README.md) — variants and states as a composed API  
- [Composition pattern (React)](../../design-patterns/composition-components/README.md) — structural composition of components  
- [Spacing patterns](../spacing-patterns/README.md) — layers, split, columns, grid, inline, inline-bundle, token roles for space  
