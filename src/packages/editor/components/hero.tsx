import { useBuilderMode } from "@/providers/builderProvider";
import applyStyles from "../nodeRenerder/applyStyles";
import { NodeComponentProps } from "../types/component";
import { HeroNode } from "../types/nodes";

export default function HeroComponent({
  node,
  props,
  style,
}: NodeComponentProps<HeroNode>) {
  const { mode } = useBuilderMode(); //현재 모드 확인
  const { heading, subHeading, button, backgroundImage } = props;
  const inlineStyles = applyStyles(style);
  const bgImageUrl = backgroundImage ? backgroundImage : null;

  const handleLinkClick = (e: React.MouseEvent) => {
    if (mode === "editor") e.preventDefault();
  };

  return (
    <div>
      <h1>{heading}</h1>
      {subHeading && <p>{subHeading}</p>}
      {button && (
        <a
          href={button && button.link}
          style={inlineStyles}
          onClick={handleLinkClick}
        ></a>
      )}
    </div>
  );
}
