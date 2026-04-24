export type Item = {
  id: string;
  label: string;
  done: boolean;
};

export type State = {
  items: Item[];
};

export type Action =
  | { type: "add"; label: string }
  | { type: "toggle"; id: string }
  | { type: "remove"; id: string }
  | { type: "clearDone" };

function createId() {
  // Stable enough for a demo; not intended as a global unique identifier.
  return `it_${Math.random().toString(16).slice(2)}`;
}

export const initialState: State = {
  items: [
    { id: "it_a", label: "Use pure reducers", done: false },
    { id: "it_b", label: "Update state immutably", done: true },
  ],
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const label = action.label.trim();
      if (label.length === 0) return state;
      return {
        ...state,
        items: [{ id: createId(), label, done: false }, ...state.items],
      };
    }
    case "toggle": {
      return {
        ...state,
        items: state.items.map((it) =>
          it.id === action.id ? { ...it, done: !it.done } : it,
        ),
      };
    }
    case "remove": {
      return { ...state, items: state.items.filter((it) => it.id !== action.id) };
    }
    case "clearDone": {
      return { ...state, items: state.items.filter((it) => !it.done) };
    }
    default: {
      return state;
    }
  }
}

