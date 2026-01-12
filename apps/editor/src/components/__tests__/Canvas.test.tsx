import { render, screen } from "@testing-library/react";
import Canvas from "../Canvas";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock zustand stores
const mockUseCurNodes = vi.fn();
const mockUseSelectedNodeId = vi.fn();
const mockUseSelectNode = vi.fn();
const mockUseUpdateNode = vi.fn();
const mockUseCanvas = vi.fn();
const mockUseSetCanvas = vi.fn();

//실제 파일을 가로채서 가짜 결과를 내뱉게 합니다.
vi.mock("@/stores/useEditorStore", () => ({
  useCurNodes: () => mockUseCurNodes(), //지연 실행 -> 이렇게 되면 다른 테스트에서 목함수의 반환값을 바꿔도 언제나 새롭게 해당 함수가 호출 되므로 다른 테스트의 영향을 받지 않는다.
  useSelectedNodeId: () => mockUseSelectedNodeId(),
  useSelectNode: () => mockUseSelectNode(),
  useUpdateNode: () => mockUseUpdateNode(),
  useCanvas: () => mockUseCanvas(),
  useSetCanvas: () => mockUseSetCanvas(),
}));

// Mock EditorNodeWrapper (Rnd 라이브러리는 jsdom환경에서 테스트 하기에 까다롭습니다.)
vi.mock("@repo/ui/core/EditorNodeWrapper.jsx", () => ({
  default: ({
    children,
    node,
  }: {
    children: React.ReactNode;
    node: { id: string };
  }) => (
    <div data-testid={`wrapper-${node.id}`} className="mock-wrapper">
      {children}
    </div>
  ),
}));

// Mock NodeRenderer
vi.mock("@repo/ui/core/NodeRenderer.jsx", () => ({
  default: ({
    children,
    node,
  }: {
    children: React.ReactNode;
    node: { id: string };
  }) => (
    <div data-testid={`renderer-${node.id}`} className="mock-renderer">
      {children}
    </div>
  ),
}));

describe("Canvas Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSelectedNodeId.mockReturnValue(null);
    mockUseCanvas.mockReturnValue({ scale: 1 });
  });

  it("Case 1: Should render empty when there are no nodes", () => {
    mockUseCurNodes.mockReturnValue([]);
    const { container } = render(<Canvas />);
    expect(container.querySelector(".canvas-root")).toBeInTheDocument();
    expect(container.querySelectorAll(".mock-wrapper")).toHaveLength(0);
  });

  it("Case 2: Should render flat nodes (Siblings)", () => {
    const flatNodes = [
      { id: "1", type: "Container", parent_id: null, layout: {} },
      { id: "2", type: "Hero", parent_id: null, layout: {} },
    ];
    mockUseCurNodes.mockReturnValue(flatNodes);

    const { container } = render(<Canvas />);

    expect(screen.getByTestId("wrapper-1")).toBeInTheDocument();
    expect(screen.getByTestId("wrapper-2")).toBeInTheDocument();
    expect(screen.getByTestId("renderer-1")).toBeInTheDocument();
    expect(container.querySelectorAll(".mock-wrapper")).toHaveLength(2);
  });

  it("Case 3: Should render nested nodes (Parent-Child)", () => {
    const nestedNodes = [
      { id: "parent", type: "Container", parent_id: null, layout: {} },
      { id: "child1", type: "Button", parent_id: "parent", layout: {} },
      { id: "child2", type: "Button", parent_id: "parent", layout: {} },
    ];
    mockUseCurNodes.mockReturnValue(nestedNodes);

    render(<Canvas />);

    // 존재 확인
    const parentWrapper = screen.getByTestId("wrapper-parent");
    const child1Wrapper = screen.getByTestId("wrapper-child1");
    const child2Wrapper = screen.getByTestId("wrapper-child2");

    expect(parentWrapper).toBeInTheDocument();
    expect(child1Wrapper).toBeInTheDocument();
    expect(child2Wrapper).toBeInTheDocument();

    // 핵심 검증: 계층 구조 확인
    // 부모의 렌더러 안에 자식의 래퍼가 들어있는가?
    // Canvas가 재귀를 제대로 돌리지 않았으면, 자식이 부모 밖에 튀어 나와 있었을 것.
    const parentRenderer = screen.getByTestId("renderer-parent");
    expect(parentRenderer).toContainElement(child1Wrapper);
    expect(parentRenderer).toContainElement(child2Wrapper);
  });

  it("Case 4: 부모-자식1-자식2-손자 관계의 트리도 렌더링이 되야 합니다.", () => {
    const nestedNodes = [
      { id: "parent", type: "Container", parent_id: null, layout: {} },
      { id: "child1", type: "Button", parent_id: "parent", layout: {} },
      { id: "child2", type: "Button", parent_id: "parent", layout: {} },
      { id: "grandson", type: "Button", parent_id: "child1", layout: {} },
    ];

    mockUseCurNodes.mockReturnValue(nestedNodes);

    render(<Canvas />);
    const parentRenderer = screen.getByTestId("renderer-parent");
    const child1Wrapper = screen.getByTestId("wrapper-child1");
    const child1Renderer = screen.getByTestId("renderer-child1"); // 👈 child1의 "렌더러(속)"를 찾아야 합니다.
    const grandsonWrapper = screen.getByTestId("wrapper-grandson");

    expect(parentRenderer).toContainElement(child1Wrapper);
    expect(child1Renderer).toContainElement(grandsonWrapper);

    expect(child1Wrapper.parentElement).toBe(parentRenderer);
    expect(grandsonWrapper.parentElement).toBe(child1Renderer);

    expect(grandsonWrapper.parentElement).not.toBe(parentRenderer);
  });

  it("Case 5: Should NOT render wrapper for root (id: null)", () => {
    // This test specifically verifies that the root pseudo-node doesn't get a wrapper
    // If the bug exists, this might crash or render a weird wrapper
    mockUseCurNodes.mockReturnValue([
      { id: "1", type: "Container", parent_id: null, layout: {} },
    ]);

    render(<Canvas />);

    // We expect wrapper-1 to exist
    expect(screen.getByTestId("wrapper-1")).toBeInTheDocument();

    // We expect NO "wrapper-null" or similar
    const wrappers = screen.getAllByTestId(/wrapper-/);
    expect(wrappers).toHaveLength(1);
  });
});
