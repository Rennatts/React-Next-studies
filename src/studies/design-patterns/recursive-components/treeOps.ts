import type { NodeId, TreeNode } from "./types";

function mapTree(node: TreeNode, fn: (n: TreeNode) => TreeNode): TreeNode {
  const mapped = fn(node);
  if (!mapped.children || mapped.children.length === 0) return mapped;
  return {
    ...mapped,
    children: mapped.children.map((c) => mapTree(c, fn)),
  };
}

export function toggleExpanded(root: TreeNode, id: NodeId): TreeNode {
  return mapTree(root, (n) => {
    if (n.id !== id) return n;
    if (n.kind !== "folder") return n;
    return { ...n, expanded: !n.expanded };
  });
}

export function renameNode(root: TreeNode, id: NodeId, label: string): TreeNode {
  const next = label.trim();
  if (next.length === 0) return root;
  return mapTree(root, (n) => (n.id === id ? { ...n, label: next } : n));
}

export function addChildFolder(
  root: TreeNode,
  parentId: NodeId,
  child: { id: NodeId; label: string },
): TreeNode {
  const label = child.label.trim();
  if (label.length === 0) return root;

  return mapTree(root, (n) => {
    if (n.id !== parentId) return n;
    if (n.kind !== "folder") return n;
    const children = n.children ?? [];
    return {
      ...n,
      expanded: true,
      children: [{ id: child.id, label, kind: "folder", expanded: false, children: [] }, ...children],
    };
  });
}

