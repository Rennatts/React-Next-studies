"use client";

import { useMemo, useReducer, useState } from "react";
import type { NodeId, TreeNode } from "./types";
import { sampleTree } from "./types";
import { addChildFolder, renameNode, toggleExpanded } from "./treeOps";

type Action =
  | { type: "toggle"; id: NodeId }
  | { type: "rename"; id: NodeId; label: string }
  | { type: "addFolder"; parentId: NodeId; label: string };

function reducer(state: TreeNode, action: Action): TreeNode {
  switch (action.type) {
    case "toggle":
      return toggleExpanded(state, action.id);
    case "rename":
      return renameNode(state, action.id, action.label);
    case "addFolder":
      return addChildFolder(state, action.parentId, {
        id: `n_${Math.random().toString(16).slice(2)}`,
        label: action.label,
      });
    default:
      return state;
  }
}

export function RecursiveTreeDemo() {
  const [tree, dispatch] = useReducer(reducer, sampleTree);
  const [newFolderLabel, setNewFolderLabel] = useState("new-folder");

  const stats = useMemo(() => {
    let folders = 0;
    let files = 0;
    const walk = (n: TreeNode) => {
      if (n.kind === "folder") folders += 1;
      else files += 1;
      n.children?.forEach(walk);
    };
    walk(tree);
    return { folders, files };
  }, [tree]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Pattern
        </p>
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span className="font-medium">Recursive rendering</span>: each node
          renders itself, then maps children to the same component. Updates are{" "}
          <span className="font-medium">immutable</span> via pure tree ops.
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          Folders: {stats.folders} · Files: {stats.files}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={newFolderLabel}
          onChange={(e) => setNewFolderLabel(e.target.value)}
          className="w-56 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
        />
        <button
          type="button"
          onClick={() => dispatch({ type: "addFolder", parentId: "design-patterns", label: newFolderLabel })}
          className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
        >
          Add folder under design-patterns
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <TreeNodeRow node={tree} depth={0} dispatch={dispatch} />
      </div>
    </div>
  );
}

function TreeNodeRow({
  node,
  depth,
  dispatch,
}: {
  node: TreeNode;
  depth: number;
  dispatch: React.Dispatch<Action>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(node.label);

  const isFolder = node.kind === "folder";
  const expanded = isFolder ? (node.expanded ?? false) : false;

  return (
    <div className="select-none">
      <div
        className="flex items-center justify-between gap-3 rounded-md px-2 py-1 hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
        style={{ paddingLeft: depth * 16 + 8 }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {isFolder ? (
            <button
              type="button"
              onClick={() => dispatch({ type: "toggle", id: node.id })}
              className="grid size-6 place-items-center rounded border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-white dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-950"
              aria-label={expanded ? "Collapse folder" : "Expand folder"}
            >
              {expanded ? "−" : "+"}
            </button>
          ) : (
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded border border-zinc-200 text-[10px] font-bold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
            >
              •
            </span>
          )}

          <span className="shrink-0 text-sm">
            {isFolder ? "📁" : "📄"}
          </span>

          {editing ? (
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full min-w-0 rounded-md border border-zinc-200 bg-white px-2 py-1 text-sm text-zinc-900 outline-none ring-zinc-300 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-700"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "rename", id: node.id, label: draft });
                  setEditing(false);
                }
                if (e.key === "Escape") {
                  setDraft(node.label);
                  setEditing(false);
                }
              }}
              autoFocus
            />
          ) : (
            <p className="min-w-0 truncate text-sm text-zinc-800 dark:text-zinc-200">
              {node.label}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!editing ? (
            <button
              type="button"
              onClick={() => {
                setDraft(node.label);
                setEditing(true);
              }}
              className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900/40"
            >
              Rename
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "rename", id: node.id, label: draft });
                setEditing(false);
              }}
              className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {isFolder && expanded ? (
        <div className="mt-1 space-y-1">
          {(node.children ?? []).map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              dispatch={dispatch}
            />
          ))}
          {(node.children ?? []).length === 0 ? (
            <p
              className="px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400"
              style={{ paddingLeft: (depth + 1) * 16 + 8 }}
            >
              Empty folder
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

