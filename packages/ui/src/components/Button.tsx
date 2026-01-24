import { useBuilderMode } from "context/builderMode";
import { useActionHandler } from "hooks/useActionHandler";
import { ButtonNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";

export default function ButtonComponent({
  node,
  props,
  style,
  children,
}: NodeComponentProps<ButtonNode>) {
  const { mode } = useBuilderMode();
  const { text, action } = props;

  //스타일 변환(className은 제외, 오직 CSS속성만)
  const nodeStyleObj = processNodeStyles(style);

  //액션 함수 생성
  const excuteAction = useActionHandler(action);

  //클릭 핸들러
  function clickHandler(e: React.MouseEvent) {
    //에디터 모드에서는 액션 실행 x
    if (mode === "editor") {
      e.preventDefault();
      return;
    }

    //라이브 모드: 실제 액션 실행
    excuteAction();
  }

  return (
    <button
      type="button"
      data-component-type={node.type}
      data-component-id={node.id}
      style={nodeStyleObj.root}
      className={`${style.root?.className} ${mode === "editor" ? "cursor-default" : "cursor-pointer"} flex h-full w-full items-center justify-center transition-all active:scale-95`}
      onClick={clickHandler} //이벤트 연결
    >
      <span style={nodeStyleObj.text}>{text}</span>
      {children}
    </button>
  );
}
