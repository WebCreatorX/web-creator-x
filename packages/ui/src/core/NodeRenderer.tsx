import ContainerComponent from "components/Container";
import ButtonComponent from "components/Button";
import HeadingComponent from "components/Heading";
import HeroComponent from "components/Hero";
import ImageComponent from "components/Image";
import Modal from "components/Modal";
import TextComponent from "components/Text";
import { WcxNode } from "types";

export default function NodeRenderer({
  node,
  children,
}: {
  node: WcxNode;
  children?: React.ReactNode;
}) {
  switch (node.type) {
    case "Hero":
      return (
        <HeroComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );

    case "Container":
      return (
        <ContainerComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );

    case "Image":
      return (
        <ImageComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );
    case "Heading":
      return (
        <HeadingComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );
    case "Text":
      return (
        <TextComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );
    case "Button":
      return (
        <ButtonComponent
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );
    case "Modal":
      return (
        <Modal
          node={node}
          props={node.props}
          style={node.style}
          children={children}
        />
      );
  }
}
