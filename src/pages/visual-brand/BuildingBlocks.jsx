import BlockField from "./BlockField.jsx";

// Building blocks (Figma 51:2842) — auto-cycles the block size until the user
// interacts, then pauses and resumes after 20s idle.
export default function BuildingBlocks() {
  return <BlockField autoCycle />;
}
