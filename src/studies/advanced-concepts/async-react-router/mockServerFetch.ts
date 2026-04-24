export async function wait(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export type User = {
  id: string;
  name: string;
  role: "student" | "admin";
};

export async function fetchUserSlow(): Promise<User> {
  await wait(900);
  return { id: "u_123", name: "Renata", role: "student" };
}

export async function fetchRecommendationsSlow(): Promise<string[]> {
  await wait(1400);
  return [
    "Read: Server Components mental model",
    "Try: loading.tsx vs Suspense fallback",
    "Learn: error.tsx boundaries per route segment",
  ];
}

