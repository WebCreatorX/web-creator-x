//에디터의 최상단에서 이벤트 위임으로 클릭된 node의 ID를 알아내는 함수

export default function readNodeId(e: React.MouseEvent<HTMLElement>) {
  const clickedElement = (e.target as HTMLElement).closest(
    "[data-component-id]",
  );
  if (!clickedElement) {
    console.log("이곳은 땅끝마을 해남입니다");
    return;
  }
  e.stopPropagation();
  const componentId = clickedElement.dataset.componentId;
  console.log(`현재 클릭된 ID -> ${componentId}`);
}
