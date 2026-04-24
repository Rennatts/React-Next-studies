# Spacing patterns in design systems

**Spacing** is how empty space separates, groups, and aligns UI. A mature system does not stop at a **scale** (4, 8, 12…)—it documents **patterns**: *when* to use which step, *where* in the hierarchy, and *who* owns the gap (parent vs child). This note covers the **layers** pattern (structural tiers), the **split** pattern (two clusters at opposite ends of a row), the **columns** pattern (parallel **inline** tracks with **symmetric gutters**), the **grid** pattern (**two-dimensional** tracks, **row and column gap** together, and alignment to a **layout grid**), the **inline** pattern (**line-box** flow, **baseline** alignment, spacing **with running text**), the **inline-bundle** pattern (a **flex-level** horizontal run of **tightly related** items that share **one `gap`** and **read as one unit** to siblings), the **pad** pattern (**padding** / **inset** between **border and content**, symmetric or **squish**), the **center** pattern (**max measure** + **inline-axis centering**, usually **`margin-inline: auto`** with **page padding**), the **media-wrapper** pattern (**aspect-ratio frame** for **img/video/embeds**, **`object-fit`**, clipping, and **intrinsic** `width`/`height` to limit **CLS**), and the **cover** pattern (**minimum block height**—often **viewport**—with **header / growing main / footer** on the **block axis**).

## Primitive scale vs semantic use

- **Primitive spacing tokens** (`space.1`, `space.2`, … or a base unit multiple) give a **bounded palette**—fewer arbitrary numbers in code and Figma.
- **Semantic tokens** (`space.inset.md`, `space.section`) map primitives to **intent** so themes and density modes can retune without renaming every component.

The **layers pattern** sits between those: it tells you **which semantic role** applies at each level of the layout tree.

## Pattern: layers (structural)

Treat the interface as a **stack of nested frames**. Each level has a **default job** for spacing; pick tokens (or documented utilities) that match that job instead of re-deciding per screen.

| Layer | Typical job | Examples | Token naming (illustrative) |
|-------|-------------|----------|-----------------------------|
| **Page / shell** | Breath at the viewport edge; rhythm between major vertical blocks | `padding` on `main`, margin between page sections | `space.page.inline`, `space.page.block` |
| **Region / container** | Inset inside cards, modals, sidebars, tables | Card body padding, dialog content padding | `space.inset.sm` … `space.inset.lg` |
| **Cluster / group** | Tight coupling between related items (not a whole section) | Form label + field + hint; filter chips in a row | `space.cluster`, `space.gap.tight` |
| **Stack / flow** | Consistent vertical (or horizontal) gap between **siblings** in a list | List rows, settings rows, FAQ items | `space.stack.sm` / `md` |
| **Inline / micro** | Icon beside text, badge padding, control internals | Button padding, input height padding | `space.inline`, `space.micro` |

**Why “layers” helps**

- Reviewers can ask: “Is this gap **page-level**, **region inset**, or **stack**?”—misclassified space is easier to spot.
- **Density** (comfortable vs compact) can retune **one layer** (e.g. stack gaps) without blowing up page chrome.
- **Composition** stays predictable: outer frames own **inset**; lists own **stack gap**; avoid leaking page margins into leaf components.

### Who owns the gap?

Prefer **the container that defines the sibling relationship** to own spacing between children:

- In **flex** or **grid**, use **`gap`** on the parent for **stack / flow** layer spacing—avoids margin collapse and “last item” hacks.
- Use **padding** on the region for **inset**; reserve **margin** mainly for **separating** distinct regions when `gap` is not available.

### Example (nested layers)

**`main`** = **page** padding; **`article`** = **region inset** + **section** margin; inner column = **stack** `gap`; each field block = **cluster** `gap`; **button** = **inline / micro** padding. Full HTML (in a comment) and React + Tailwind live in [`LayerPatternLayersExample.tsx`](./LayerPatternLayersExample.tsx).

### Anti-patterns

- **Same concern, two layers** — e.g. huge section margin *and* duplicate padding on every inner card for the same visual breath.
- **Leaf components with page knowledge** — a `Button` should not encode `margin-top: 64px` for “distance from hero”; the **page or section** layout owns that.
- **Only numeric tokens, no roles** — teams still pick `space.3` vs `space.4` arbitrarily; semantic **layer → token** mapping reduces bikeshedding.

## Pattern: split

A **split** is a **single horizontal row** (in LTR; use **logical** `start` / `end` for RTL) where the UI divides into **two groups**: one anchored to the **inline start**, one to the **inline end**, with **flexible space between** them. Classic cases: **app bar** (brand + nav left, actions right), **toolbar** (filters left, primary button right), **list row** (title left, metadata + chevron right), **card footer** (secondary actions left, primary right).

### What the system should specify

- **Structure** — Two **clusters** (each may be a `Stack`/`Inline` or a fragment), not three unrelated siblings fighting `justify-content: space-between`.
- **Intra-cluster spacing** — Gaps *within* the left and right groups use **cluster** / **inline** tokens from the [layers](#pattern-layers-structural) model; the **void in the middle** is usually **no token**—it is whatever is left after `min-width` and flex rules.
- **Implementation recipes** — Document one or two allowed approaches, for example:
  - **Flex + `justify-content: space-between`** when you have exactly two flex children (each child is already a cluster wrapper).
  - **Flex + `gap` on the row** for outer breathing room, **first cluster** as a flex child, **second cluster** with **`margin-inline-start: auto`** so the pair still splits when the first cluster wraps (pair with `flex-wrap` rules you accept).
- **Overflow** — What happens when both sides are wide: **truncate** with `min-width: 0` on text flex items, **wrap** to two lines, or **scroll** horizontally for toolbars—pick per primitive and document it.
- **Accessibility** — DOM order should match a sensible **tab order**; avoid visually splitting controls whose keyboard flow should stay adjacent unless skip links or roving tabindex are intentional.

### Relation to layers

The **split row** often sits at **region** or **page** layer (full-width bar). Spacing **inside** each cluster is **not** “split spacing”—it is still **cluster** / **micro** tokens. The split pattern answers **alignment across the main axis**, not which `space.*` fills the middle.

### Example (split row)

Two cluster wrappers on one flex row with **`justify-content: space-between`**, **`gap`** inside each cluster, and **`min-w-0`** on the start side for truncation—see [`SplitPatternExample.tsx`](./SplitPatternExample.tsx).

### Anti-patterns

- **`space-between` on ungrouped items** — five loose icons become uneven gaps; wrap clusters in two wrappers.
- **`margin-left: auto` (physical)** on the last item only — breaks in **RTL**; prefer **`margin-inline-start: auto`** on the end cluster or `justify-content: space-between` with two children.
- **Hiding the pattern behind one-off utility strings** — every screen reimplements the bar; expose a **`Split`**, **`Toolbar`**, or documented **recipe** so review stays consistent.

## Pattern: columns

A **column layout** divides space along the **inline axis** into **two or more parallel tracks**—marketing feature grids, settings form beside preview, dashboard tiles, responsive “card decks.” The spacing pattern teams care about most is the **gutter**: the **gap between columns**, usually **one token** applied **symmetrically** so rhythm stays even without “every child but the last” margin rules.

### What the system should specify

- **Gutter token(s)** — e.g. `space.gutter.sm` / `md` mapped to primitives; may pair with **row gap** (`space.stack.*`) when the grid wraps to multiple rows—document whether **column-gap** and **row-gap** use the same step or different roles.
- **Track definition** — **Fixed column counts** (12-col mental model, 2-up / 3-up at breakpoints) or **fluid** `minmax` tracks; either way, **document breakpoints** where columns **collapse** to a single stack so gutters do not accidentally become the only vertical rhythm.
- **Implementation recipe** — Prefer **CSS Grid** (`grid-template-columns` + **`gap`**) or **flex** with **`gap`** over **per-item margins** for gutters; `gap` keeps **RTL** and **wrapping** predictable.
- **Minimum widths** — Rules for **when a column stops shrinking** (`min-width`, `minmax(min, 1fr)`) so text and controls stay readable; spacing tokens are useless if tracks over-compress.
- **Alignment** — Whether cells **stretch** to equal height, **start**-align, or **baseline**-align for mixed type + controls—spacing looks “wrong” when vertical alignment is undefined.

### Columns vs split

| | **Split** | **Columns** |
|---|-----------|-------------|
| **Structure** | Two clusters, **flexible void** in the middle | **N** tracks, **repeated gutter** between neighbors |
| **Typical use** | Toolbars, list rows, “left / right” chrome | Grids of cards, multi-field rows, dashboards |
| **Main spacing decision** | Often **no token** for the middle | **`gap` / gutter token** between tracks |

### Relation to layers

The **grid or flex container** that defines columns usually sits at **page** or **region** layer. **Inset** on the whole grid is still **region** / **page** padding; **inside** each column, use **stack** and **cluster** tokens as usual. Do not push **gutter** responsibility down into every leaf card—keep it on the **layout parent**.

### Example (two-column grid)

CSS Grid with **`gap-x`** / **`gap-y`** mapped to **gutter** vs **stack** tokens, responsive track count, and gutter owned by the parent—see [`ColumnsPatternExample.tsx`](./ColumnsPatternExample.tsx).

### Anti-patterns

- **`margin-inline-end` on every column except the last** — duplicates logic, fights RTL, complicates wrap; use **`gap`** on the parent.
- **Different gutter values per screen** without a breakpoint story — undermines scanability; tie changes to **tokens** and **documented breakpoints**.
- **Treating a two-column form like a split** — two equal-ish content columns often want a **stable gutter** and similar track widths; a **split** is about **pushing groups to the edges**, not equal multi-track rhythm (hybrids exist—document them).

## Pattern: grid

A **grid**—in both **design tooling** and **CSS**—is a **two-dimensional** arrangement: content sits in **rows and columns** at the same time. Spacing is not only **gutters between columns** (see [columns](#pattern-columns)); it also includes **gaps between rows**, **alignment of the whole grid inside its container**, and (for marketing or dashboards) **how wide elements span** across tracks without breaking rhythm.

### Design layout grid vs CSS Grid

- **Layout grid (design spec)** — A **page- or section-level** contract: e.g. **12 columns**, **fluid side margins**, **fixed gutter**—so designers and engineers agree where **keylines** fall. Tokens often mirror this (`layout.margin`, `space.gutter`, max content width). The grid pattern is where **macro alignment** meets **spacing tokens**.
- **CSS Grid (implementation)** — `display: grid`, **`grid-template-columns` / `rows`**, **`gap`** (or separate **`row-gap`** and **`column-gap`**). Use it when you need **2D placement** (spans, named areas, both axes controlled together), not only a single flex row.

### What the system should specify

- **Gap roles on both axes** — Same token for row and column (`gap: var(--space-gutter-md)`) or **different** roles (`column-gap` = gutter, `row-gap` = stack rhythm); document the default and exceptions (e.g. dense dashboards vs airy marketing).
- **Track templates** — **Fixed counts** per breakpoint, **`repeat(auto-fill, minmax(...))`** for card walls, or **explicit areas** (`grid-template-areas`) for complex shells—each choice changes how **space breathes** when content height varies.
- **Spanning rules** — Which components may **span multiple columns** or rows, and how that interacts with **gutter** count (e.g. hero spans 12 with **internal** inset still from the [layers](#pattern-layers-structural) model).
- **Min sizes and overflow** — Same spirit as columns: **`minmax`**, **`min-width: 0`** on scrollable cells, and what happens when **fewer items** than columns leave **empty tracks** (stretch vs start-align the grid in the container).

### Grid vs columns (in this doc)

| | **Columns** (pattern above) | **Grid** (this section) |
|---|------------------------------|-------------------------|
| **Emphasis** | **Inline** tracks + **gutter** between neighbors | **Row + column** rhythm, **2D** placement, **layout grid** alignment |
| **Typical depth** | Often one **logical row** of tracks (may wrap as new rows with flex) | **Multiple rows** by design, **spans**, **areas** |
| **Token story** | Gutter-first; row gap when wrapping is secondary | **Explicit** row gap + column gap (or unified `gap`) |

A **card gallery** implemented as CSS Grid with `auto-fill` is both: use **column** thinking for **gutter** and **grid** thinking for **row gap + reflow**.

### Relation to layers

**Layout grid** specs usually belong to **page / shell**; **component grids** (tile pickers, keyboard keys) sit in **region**. **Inset** on the grid container is still separate from **inter-cell gap**—do not replace cell **padding** with gutter tokens for “more air” inside a card.

### Example (2D shell)

CSS Grid with **separate** `gap-x` / `gap-y` token roles, **explicit rows**, and **column-spanning** header/footer—see [`GridPatternExample.tsx`](./GridPatternExample.tsx).

### Anti-patterns

- **CSS Grid for a single-axis list** — a **stack** with `gap` is simpler and clearer; grids shine when **2D** rules matter.
- **`1fr` tracks without a floor** — columns collapse unreadably; pair **`minmax`** with **token-backed minimums**.
- **Mismatched gutters** — outer page grid says **24px** gutter but nested component grids use **16px** everywhere with no rule—document **when nesting may diverge** (e.g. dense widgets inside a marketing section).
- **Spanning for decoration only** — wide spans that skip **logical reading order** or keyboard path without documentation.

## Pattern: inline

The **inline** pattern is about UI that participates in an **inline formatting context**—the same kind of flow as **words in a paragraph**: pieces sit on a **line box**, **wrap** to the next line when space runs out, and align on a **text baseline** (or a documented **`vertical-align`** such as `middle` for icons). Think **icon + link inside a sentence**, **footnote markers**, **inline badges** beside a heading word, or **comma-separated metadata** rendered as real inline nodes rather than a flex row.

This is **not** the same as dropping `display: flex` on every horizontal group: **Flex Layout** uses **`gap`** and **block-level** margin rules; **true inline** flow uses **different spacing mechanics** (margins on `inline-block` / replaced elements, **collapsing** behavior, and **literal whitespace** between JSX/HTML siblings).

### What the system should specify

- **When to stay inline** — Content that must **read as continuous copy** or **reflow like text** should stay in **inline / inline-block** (or **`inline-flex`** only when the whole control is still one **atomic** inline participant). Document **exceptions** (e.g. “chip lists always use [inline-bundle](#pattern-inline-bundle), not inline flow”).
- **Horizontal spacing** — Prefer **token-backed margins** on the non-text piece (e.g. `margin-inline-start` on an icon or pill) or a **thin space character** / separator component—**not** ad-hoc `&nbsp;` chains. Call out **React whitespace**: newlines between components can render as **unwanted gaps**; the system may recommend **comments**, **tight `{}`**, or **`margin` instead of relying on whitespace**.
- **Vertical alignment** — Defaults for **icon + text** (`vertical-align: middle` vs `baseline`) and for **superscript-sized** labels so **line-height** does not jump unpredictably.
- **Line height and touch targets** — Inline controls next to body copy may need **minimum hit area** without increasing **line-height** for the whole paragraph—document **padding** on `inline-block` or **wrapper** patterns.

### Inline vs inline-bundle

| | **Inline** (this section) | **Inline-bundle** |
|---|---------------------------|-------------------|
| **Layout model** | **Inline formatting** / line boxes | **Flex** (usually `inline-flex` or flex row) with **`gap`** |
| **Best for** | **Inside** or **beside** running text | **Toolbar-like clusters**, chips, **segmented** controls—**UI chrome**, not mid-sentence |
| **Spacing lever** | Margins, separators, **typographic** rules | **Single `gap`** token on the flex container |

Use **[inline-flex](https://developer.mozilla.org/en-US/docs/Web/CSS/display#inline-flex)** when a control is **one inline object** to the outer paragraph but **internally** needs flex alignment; spacing **inside** still follows **inline-bundle** rules if you use **`gap`** there.

### Relation to layers

The **inline** pattern maps to the **inline / micro** layer in the [layers](#pattern-layers-structural) table. It should not inherit **gutter** or **page** tokens unless the whole paragraph is a layout exception.

### Example (link + inline icon)

**Line-box** copy with **`margin-inline-start`** on an **`inline-block`** icon, **`align-middle`**, and explicit **`{' '}`** text nodes—see [`InlinePatternExample.tsx`](./InlinePatternExample.tsx).

### Anti-patterns

- **Flex + `gap` for every mid-sentence icon** — can work, but breaks **baseline** continuity and **screen-reader** phrasing if over-wrapped; prefer **true inline** when design is **text-first**.
- **Ignoring whitespace** between `<span>` and `<a>` in JSX—mystery **4px gaps** or missing space in reviews.
- **`line-height: 1` on everything** to “fix” alignment—hurts **readability** of surrounding copy; tune **per pattern** instead.

## Pattern: inline-bundle

An **inline-bundle** is a **single group** of **related** pieces laid out on the **inline axis** using **Flex Layout**—**filter chips**, **metadata** rows (when not plain copy), **compact button groups**, **segmented** controls, or **breadcrumb** bars implemented as a flex row. For **line-box flow** next to body text (icons in a sentence, inline pills in a heading), prefer the [inline](#pattern-inline) pattern above.

Spacing **inside** the bundle uses **one gap token** (usually **cluster** or **inline** scale from the [layers](#pattern-layers-structural) model). Spacing **between this bundle and whatever sits next to it** (another bundle, a primary action, body copy) is **not** solved with extra margins on the outer items of the bundle; it belongs to the **parent** layout ([stack](#pattern-layers-structural), [split](#pattern-split), [columns](#pattern-columns), or **region inset**).

Many libraries ship this as **`Cluster`**, **`Inline`**, **`ButtonGroup`**, or **`HStack`** with wrap—**“inline-bundle”** names the **spacing contract**: *internal rhythm vs external separation*.

### What the system should specify

- **Internal gap** — One documented step (e.g. `space.cluster` or `space.inline-gap`) applied with **`gap`** on a flex or inline-flex container—**not** per-child margins.
- **Wrap and overflow** — Whether items **wrap** to multiple lines (`flex-wrap: wrap` + same `gap`), **truncate** with ellipsis on the run, or **scroll horizontally** (toolbar overflow); each choice has **accessibility** implications (focus order, keyboard reachability).
- **Alignment** — **`align-items: center`** (or baseline for text-heavy runs) so mixed icon + text heights do not look vertically “off” without ad-hoc padding on each child.
- **Semantics** — Related toggles: **`role="group"`** + visible or `aria-label`; related radios/checkboxes: **`fieldset` / `legend`** where appropriate—spacing patterns should not encourage **visually** grouping **unrelated** actions just to save space.

### Inline-bundle vs split vs columns

| | **Inline-bundle** | **Split** | **Columns** |
|---|-------------------|-----------|-------------|
| **Goal** | One **cohesive** group on the inline axis | **Two** groups at **start** and **end** | **N** **equal-ish** tracks + gutter |
| **Typical gap** | Small, **uniform** inside the bundle | Often **no token** for the middle void | **Gutter** between tracks |
| **Examples** | Tags, “Back · Title”, icon+text | Toolbar ends | Card grid |

### Relation to layers

Inline-bundles usually sit in the **cluster** or **inline / micro** layer. They should **not** carry **page**-level padding; the parent **region** or **stack** owns separation from other blocks.

### Example (filter chip bundle)

**`flex` + `flex-wrap` + one `gap` token**, **`role="group"`** + **`aria-labelledby`**—see [`InlineBundlePatternExample.tsx`](./InlineBundlePatternExample.tsx).

### Anti-patterns

- **`margin-inline-end` on every child except the last** inside the bundle—use **`gap`** on the wrapper.
- **Leaking bundle spacing outward** — e.g. `margin-inline-end` on the last chip to “separate from the button”; prefer **gap** on the parent row or a [split](#pattern-split) between **bundles** and actions.
- **Unbounded horizontal growth** — dozens of chips in one non-wrapping, non-scrolling row; define **max lines**, **+N overflow**, or **wrap** with rules.
- **One bundle mixing unrelated intents** — e.g. destructive action tucked inside a metadata chip row; breaks scan patterns and **group** semantics.

## Pattern: pad

**Pad** means **`padding` on the container** between its **edge** (border, radius, shadow box) and **its children**—the **inset** you document as `space.inset.*` (or platform equivalents). It answers: “How far does content sit **inside** this surface?” It is **not** spacing **between** flex/grid siblings (that is **`gap`**) and not **pushing the whole box** away from neighbors (that is usually **`margin`** on the outer layout or **parent `gap`**).

### Symmetric vs squish

- **Symmetric** — Same token on all sides (`padding: var(--space-inset-md)`), typical for **cards**, **dialogs**, and **panels**.
- **Squish (asymmetric)** — Different **inline** vs **block** padding (e.g. **wider** `padding-inline` than `padding-block`) for **toolbars**, **table headers**, and **compact** strips so controls stay **short** while text still has **horizontal** breath.

### Relation to layers

Pad maps to the **region / container** layer for shells and to **inline / micro** for **control internals** (button padding). It pairs with [layers](#pattern-layers-structural): use **pad** for **border → content**, **`gap`** for **child → child**.

### Example (card + squish toolbar)

Symmetric card inset and asymmetric inner strip—see [`PadPatternExample.tsx`](./PadPatternExample.tsx).

### Anti-patterns

- **Margin-stacking “fake pad”** — multiple children each with `margin` to simulate an inset box; prefer **one padding** on the parent surface.
- **Padding + redundant outer margin** on the same concern — same air applied twice (see [layers](#pattern-layers-structural) anti-patterns).
- **Gutter tokens as card interior pad** — **column gutters** belong on the **grid parent**; card bodies use **inset** steps, or you lose a clear vocabulary in review.

## Pattern: center

The **center** pattern caps the **readable or layout width** of a block and **centers it on the inline axis** (in LTR/RTL: horizontally in horizontal writing modes). Typical tools: **`max-width`** from a **layout** or **typography** token (`layout.measure`, `prose` width) plus **`margin-inline: auto`** on that block, with **`padding-inline`** on the same wrapper or an outer **page** shell so content never touches the viewport rim on phones.

### When to use it

- **Article body**, **settings forms**, **marketing copy**—any single column that should not grow past a comfortable measure on ultra-wide monitors.
- **Modals** already centered by overlay positioning may still use an **inner** max-width for the dialog panel itself.

### Center vs columns / grid

- **Center** — **One** main column; no **gutter** between multiple tracks—only **space to the left and right of the same box**.
- **Columns / grid** — **Multiple** tracks with **gap** or gutters between them; centering can happen **inside** one grid cell but is not the same primitive.

### Relation to layers

Belongs with **page / shell** (and sometimes **region**) alongside **`space.page.inline`**. Do not confuse **centering the column** with **padding inside** every child—[pad](#pattern-pad) the wrapper once.

### Example (measure + `mx-auto`)

Capped width, **`margin-inline: auto`**, and page-inline padding—see [`CenterPatternExample.tsx`](./CenterPatternExample.tsx).

### Anti-patterns

- **`text-align: center`** on long **body paragraphs** — centers each line awkwardly; use **`mx-auto`** on a **block** with max-width for the column, left-align text inside unless designing a hero.
- **Max-width on every paragraph** — set **one wrapper**; avoid repeating the same constraint on each element.
- **`transform: translate`** to center layout blocks — fragile (overflow, subpixel); prefer **auto margins** or **flex/grid** alignment documented by the system.

## Pattern: media-wrapper

A **media-wrapper** is a **layout shell** around **replaced content**—images, video, maps, PDF embeds—so the **surrounding page** gets a **stable box**: predictable **height** (via **`aspect-ratio`** or equivalent), **overflow** clipping when combined with **radius**, and **`object-fit`** (or contain/fill policies) so crops are **intentional**. It is a **layout** pattern first; **spacing tokens** apply to **padding outside** the frame, **gaps** to neighboring blocks, and **captions**, not to “fix” a raw `<img>` with ad-hoc margins.

### What the system should specify

- **Aspect policy** — **Fixed ratios** (`16 / 9`, `4 / 3`, `1 / 1`), **min height** with **max width 100%**, or **uncapped** height for editorial **art direction**—each choice changes how **below-the-fold** rhythm behaves.
- **Fit policy** — **`cover`** vs **`contain`** vs **`fill`**; document **focal point** or **`object-position`** when marketing crops hero photography.
- **Performance** — **`width` / `height`** (or CSS sizing) so the browser **reserves space** before decode; pair with **lazy loading** and **priority** rules for LCP candidates.
- **Embeds** — **Iframe** sandboxes, **consent** gating, and **fallback** height when scripts fail—still expressed as **one wrapper** API in components.

### Relation to other patterns

- **[Pad](#pattern-pad)** — **Figure** or **card** may use **inset** around the whole block; the **ratio box** is often **flush** inside that inset.
- **[Center](#pattern-center)** — The **figure** often lives inside a **centered** column; the wrapper still prevents the **media band** from exceeding the column width.

### Example (aspect-video + `object-cover`)

See [`MediaWrapperPatternExample.tsx`](./MediaWrapperPatternExample.tsx).

### Anti-patterns

- **Only `max-width: 100%` on the `<img>`** with **no height discipline** — stops horizontal bleed but still **jumps** when the bitmap arrives; pair with **ratio** or explicit **height**.
- **Hard-coded pixel `height` on every breakpoint** — use **tokens**, **`aspect-ratio`**, or **container queries** where supported instead of duplicating magic numbers.
- **Border-radius on the `<img>` alone** — without **`overflow: hidden`** on a parent, sibling overlays and **video controls** can paint outside the rounded intent; clip at the **wrapper**.

## Pattern: cover

The **cover** pattern fills at least a **target block height**—classically the **viewport**—with a **column** of regions where **header** and **footer** (or top/bottom chrome) stay **content-sized** and **main** **grows** to absorb leftover **vertical** space. Implementation is usually **`display: flex; flex-direction: column; min-height: 100dvh`** (or **`100svh`**) on the shell, **`flex-shrink: 0`** on bookends, and **`flex-grow: 1`** on **`main`**. Spacing **tokens** apply to **pad** on each band and to **gaps** inside `main` (e.g. [stack](#pattern-layers-structural)), not to “stretch” by setting a fake huge **margin** on the last paragraph.

### What the system should specify

- **Which shell owns `min-height`** — Often **`body` > layout root** or a **route layout** wrapper; avoid duplicating **`min-h-screen`** on every page component.
- **Viewport units** — Prefer **`dvh` / `svh`** over **`vh`** where supported so **mobile browser chrome** does not clip or double-scroll; document **fallbacks** if you must support older engines.
- **Overflow** — Whether **`main`** **scrolls** (`overflow-y-auto`, **`min-h-0`** on flex children when nested) or the **whole page** scrolls; sticky headers change the contract.
- **Optional centering** — **`justify-center`** on `main` when the design wants **vertical centering** of a short hero inside the grown area (pairs with [center](#pattern-center) for **max-width** of the hero column).

### Relation to other patterns

- **[Split](#pattern-split)** — The **header** inside a cover shell is often a **split** row (brand vs actions).
- **[Stack](#pattern-layers-structural)** — **Inside** `main`, sibling sections still use **stack gap**; cover only solves **shell-level** height distribution.

### Example (flex column + `flex-1` main)

Bounded-height demo of **header / growing main / footer**—see [`CoverPatternExample.tsx`](./CoverPatternExample.tsx).

### Anti-patterns

- **`min-height: 100vh` on every nested route** — stacks with **ancestors** that also set full height and causes **double scroll** or **zero-height flex** bugs; pick **one** owner.
- **`flex-1` without `min-h-0` on nested scrollers** — flex items default to **`min-height: auto`**; inner lists may **refuse to shrink** and break overflow scrolling—document the **`min-h-0`** escape hatch.
- **Footer `position: fixed` as a substitute** — bypasses cover semantics and complicates **keyboard overlap**, **focus order**, and **safe area**; prefer **flex cover** unless the product truly needs a fixed dock.

## Relation to other topics

- [Key concepts](../key-concepts/README.md) — primitives vs semantic tokens, layout and density.
- [Style composition](../style-composition/README.md) — stacking utilities, variants, and slots without breaking boundaries.
- [Reusability and encapsulating styles](../reusability-and-styles/README.md) — keeping layout concerns behind a stable component API.

## What can come next in this series

Additional spacing patterns worth documenting later: **vertical rhythm** (single stack source of truth), **asymmetry and subgrid** within complex grids, **responsive steps** (larger page inset on wide breakpoints), **full-bleed breakout** against a layout grid, and **touch-target minimums** paired with visual tightness.

For layout primitives that often implement splits and stacks together, general React structure is covered in [Composition pattern (React)](../../design-patterns/composition-components/README.md).
