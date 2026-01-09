import { useBuilderMode } from "context/builderMode";
import Image from "next/image";
import processNodeStyles from "../utils/processNodeStyles";
import { HeroNode, NodeComponentProps } from "types";

export default function HeroComponent({
  node,
  props,
  style,
  children,
}: NodeComponentProps<HeroNode>) {
  const { mode } = useBuilderMode(); //현재 모드 확인

  //이 props의 내부 Key에 따라서 하위에 렌더링될 요소들이 결정된다.
  const { heading, subHeading, button, image } = props;

  //TODO - 🚨 style이나 node가 변경될 때만 재연산되게 useMemo로 메모이제이션 사용해야할 필요가 있다.
  const nodeStyleObj = processNodeStyles(style);

  /**
   *
   * image태그가 z-0에 깔려있고 컨텐츠를 감싸는 컨테이너 div가 image태그 위에 존재합니다.
   */
  const handleLinkClick = (e: React.MouseEvent) => {
    if (mode === "editor") e.preventDefault();
  };

  return (
    //TODO - 노드들이 드래그 앤 드롭될때 위치가 자유롭게 변하게 할 수 있어야한다.
    <section
      data-component-id={node.id}
      className={`${style.root?.className || ""} flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden`}
      style={{
        ...nodeStyleObj.root,
        // ⚠️ 안전 장치: style 객체에 크기 정보가 있어도 무시하고 강제로 100%로 덮어씁니다.
        width: "100%",
        height: "100%",
      }}
    >
      {/* 배경 이미지 영역 */}
      {image?.url && (
        <div
          className={`${style.image?.className || ""} absolute inset-0 z-0`}
          style={nodeStyleObj.image}
        >
          <Image
            fill={true}
            className={"object-cover"}
            src={image.url}
            alt={image.alt || "Hero Background"}
            priority={true}
          />
          <div className={"absolute inset-0 bg-black/40"} />
        </div>
      )}

      {/* --- 콘텐츠 영역 (z-index를 높여서 이미지 위에 표시) --- */}
      <div
        className={"relative top-0 left-0 z-10 flex flex-col items-center p-4"}
      >
        <h1
          className={style.heading?.className || ""}
          style={nodeStyleObj.heading} // heading 스타일 적용 (폰트 크기, 색상)
        >
          {heading}
        </h1>

        {subHeading && (
          <p
            className={style.subHeading?.className || ""}
            style={nodeStyleObj.subHeading}
          >
            {subHeading}
          </p>
        )}
        {button && (
          <a
            href={button.link || "#"}
            style={nodeStyleObj.button}
            className={style.button?.className || ""}
            onClick={handleLinkClick}
            //백그라운드 사진 렌더링 필요
          >
            {button?.text}
          </a>
        )}
        {children}
      </div>
    </section>
  );
}
