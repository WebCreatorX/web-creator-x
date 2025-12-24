import { ModalNode, NodeComponentProps } from "types";
import processNodeStyles from "utils/processNodeStyles";
import { motion } from "framer-motion";

const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
  // 기본값 (Zoom In)
  default: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
};

/**
 *
 * @param param0
 * @returns
 *
 * 해당 모달 렌더러를 에디터에서 보여주고 싶다면 기본 상태는 isOpen:flase 이므로 에디터에 한해서만 강제로 updateNodeState(id, { isOpen: true })를 호출해서 보여줘야합니다.
 */
export default function Modal({
  node,
  style,
  children, //모달안에 들어갈 버튼, 텍스트 등이 children으로 올 수 있습니다.
}: NodeComponentProps<ModalNode>) {
  const curNodeId = node.id;
  const animationType = node.props.animation || "default";

  //스타일 변환
  const nodeStyleObj = processNodeStyles(style);

  return (
    <motion.div
      data-component-id={curNodeId}
      key={curNodeId}
      onClick={(e) => e.stopPropagation()}
      className={`${style.root?.className || ""} pointer-events-auto relative bg-white shadow-2xl`}
      style={nodeStyleObj.root}
      variants={animationVariants[animationType as keyof typeof animationVariants] || animationVariants.default}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* [Body] 자식 노드들(버튼, 이미지, 텍스트)이 여기에 렌더링 됨 */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
