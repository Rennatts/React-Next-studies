export type NodeId = string;

export type TreeNode = {
  id: NodeId;
  label: string;
  kind: "folder" | "file";
  expanded?: boolean;
  children?: TreeNode[];
};

export const sampleTree: TreeNode = {
  id: "root",
  label: "react-studies",
  kind: "folder",
  expanded: true,
  children: [
    {
      id: "design-patterns",
      label: "design-patterns",
      kind: "folder",
      expanded: true,
      children: [
        { id: "hoc", label: "hoc", kind: "folder", expanded: false, children: [] },
        { id: "custom-hooks", label: "custom-hooks", kind: "folder", expanded: false, children: [] },
        { id: "fp", label: "functional-programming", kind: "folder", expanded: false, children: [] },
      ],
    },
    {
      id: "notes",
      label: "notes.md",
      kind: "file",
    },
  ],
};

