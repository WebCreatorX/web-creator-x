import ContainerComponent from "components/Container";
import ButtonComponent from "components/Button";
import HeadingComponent from "components/Heading";
import HeroComponent from "components/Hero";
import ImageComponent from "components/Image";
import Modal from "components/Modal";
import TextComponent from "components/Text";
import { WcxNode } from "types";
import Group from "components/Group";

export default function NodeRenderer({
  node,
  children,
}: {
  node: WcxNode;
  children?: React.ReactNode;
}) {
  switch (node.type) {
    case "Hero":
      return <HeroComponent node={node} children={children} />;

    case "Container":
      return <ContainerComponent node={node} children={children} />;

    case "Image":
      return <ImageComponent node={node} children={children} />;
    case "Heading":
      return <HeadingComponent node={node} children={children} />;
    case "Text":
      return <TextComponent node={node} children={children} />;
    case "Button":
      return <ButtonComponent node={node} children={children} />;
    case "Modal":
      return <Modal node={node} children={children} />;
    case "Group":
      return <Group node={node} children={children} />;
  }
}
