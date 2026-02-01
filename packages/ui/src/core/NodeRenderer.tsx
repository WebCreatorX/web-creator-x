import ContainerComponent from "components/Container";
import ButtonComponent from "components/Button";
import HeadingComponent from "components/Heading";
import ImageComponent from "components/Image";
import TextComponent from "components/Text";
import { WcxNode } from "types";
import GroupComponent from "components/Group";
import ModalComponent from "components/Modal";

export default function NodeRenderer({
  node,
  children,
}: {
  node: WcxNode;
  children?: React.ReactNode;
}) {
  switch (node.type) {
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
      return <ModalComponent node={node} children={children} />;
    case "Group":
      return <GroupComponent node={node} children={children} />;
  }
}
