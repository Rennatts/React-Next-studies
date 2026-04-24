# API layer with React Query (TanStack Query)

React Query (TanStack Query) sits **above** your API client and focuses on:

- Caching and deduping requests
- Background refetching
- Managing loading/error states
- Stale-while-revalidate style UX

You still want a small **API client** underneath to centralize base URL, headers, and error normalization.

## Idea in one sentence

- **API client** does HTTP; **React Query** manages server-state lifecycle (cache, retries, refetch, stale).

## Recommended layering

- `apiClient.ts`: `requestJson<T>()` and normalized `ApiError`
- `endpoints/*.ts`: one function per endpoint (e.g. `getProducts()`)
- `queries/*.ts`: query key helpers + query functions (optional)
- UI: calls `useQuery()` / `useMutation()`

## What we implement in this folder

| File | Role |
|------|------|
| `products.ts` | Typed endpoint function built on the existing `requestJson<T>()`. |
| `ReactQueryProductsDemo.tsx` | Demo using `QueryClientProvider` + `useQuery`. |

## Fetching data with React Query

### 1) Use a stable, descriptive `queryKey`

Your `queryKey` is the identity of the cached result. Use a tuple:

- `["products"]`
- `["products", { filter, page }]`

React Query will cache/dedupe by key.

### 2) Use `useQuery` for reads

```tsx
const productsQuery = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
  staleTime: 10_000,
  refetchOnWindowFocus: false,
});
```

UI states to know:

- `isPending`: first load (no data yet)
- `isError`: error happened
- `data`: cached or fetched result
- `isFetching`: background refetch *can be true even when you have data*

This is a key way to avoid loader flicker: show a spinner only when `isPending`, and show a subtle “Refreshing…” when `isFetching && data`.

### 3) Put retry decisions close to the query

Examples:

- `retry: 0` for auth errors or deterministic 4xx
- default retry for flaky networks

Keep these policies consistent across your app.

## Updating data with React Query

### 1) Use `useMutation` for writes

```tsx
const mutation = useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  },
});
```

Important ideas:

- Mutations are not “cached” like queries.
- After success, you usually **invalidate** related queries so they refetch and stay consistent.

### 2) Prefer invalidation over manual cache edits (at first)

For most apps, this is the simplest correct approach:

- `onSuccess` → `invalidateQueries`

Once you need instant UI updates or heavy lists, you can move to cache updates or optimistic updates.

### 3) Optimistic updates (advanced)

When you want immediate UI updates:

- Cancel in-flight queries
- Snapshot previous cache
- Update cache optimistically
- Roll back on error
- Invalidate on settle

Sketch:

```ts
onMutate: async (newItem) => {
  await queryClient.cancelQueries({ queryKey: ["products"] });
  const previous = queryClient.getQueryData(["products"]);
  queryClient.setQueryData(["products"], (old) => optimisticMerge(old, newItem));
  return { previous };
},
onError: (_err, _vars, ctx) => {
  queryClient.setQueryData(["products"], ctx?.previous);
},
onSettled: () => {
  queryClient.invalidateQueries({ queryKey: ["products"] });
},
```

Use optimistic updates when the UX gain is worth the complexity.

## Pagination with React Query

Key points:

- **Include pagination params in the `queryKey`** (`page`, `limit`, filters).
- Keep old page data on screen while fetching the next page to avoid flicker.

In TanStack Query v5, the common pattern is:

- `placeholderData: keepPreviousData`

Example:

```tsx
const q = useQuery({
  queryKey: ["products", "page", { page, limit }],
  queryFn: () => getProductsPage({ page, limit }),
  placeholderData: keepPreviousData,
});
```

In this repo, see `PaginatedProductsDemo.tsx`.

## Infinite scroll with React Query

Use `useInfiniteQuery` when you want to append pages and keep all previously loaded pages in memory:

- Provide `initialPageParam`
- Implement `getNextPageParam(lastPage)` to tell React Query when to stop
- Render accumulated items via `data.pages.flatMap(...)`

Example shape:

```tsx
const q = useInfiniteQuery({
  queryKey: ["products", "infinite", { limit }],
  initialPageParam: 1,
  queryFn: ({ pageParam }) => getProductsPage({ page: Number(pageParam), limit }),
  getNextPageParam: (lastPage) =>
    lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
});
```

To implement “true” infinite scroll, combine it with an `IntersectionObserver` sentinel that calls `fetchNextPage()` when visible.

In this repo, see `InfiniteProductsDemo.tsx`.

## Query cancellation (AbortSignal)

React Query passes an `AbortSignal` to your `queryFn`. To make cancellation work:

- Use that `signal` in the query function
- Ensure your API client forwards it to `fetch`

Example:

```tsx
const q = useQuery({
  queryKey: ["products"],
  queryFn: ({ signal }) => requestJson("/api/studies/products", { signal }),
});
```

To cancel in-flight work, call:

```ts
queryClient.cancelQueries({ queryKey: ["products"] });
```

In this repo, see `QueryCancellationDemo.tsx`.

## Notes worth remembering

- **Caching**: multiple components using the same `queryKey` share cached data.
- **staleTime**: how long data is considered “fresh” (avoid flickering loaders for quick navigations).
- **refetchOnWindowFocus**: great for dashboards; can be noisy for forms.
- **Keep showing data while refetching**: `isFetching` can be `true` while you still have `data`.

## Try it

Run the app and open `/studies/api/api-layer-react-query`.

