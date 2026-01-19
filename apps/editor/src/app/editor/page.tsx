import getNodesFromDB from "@/actions/editor/getNodesFromDB";
import Canvas from "@/components/editor/Canvas";
import EditorStoreInitializer from "@/components/editor/EditorStoreInitializer";

export default async function EditorPage() {
  const pageId = 201; //목데이터입니다.
  //서버 액션 함수(nodes데이터 패칭함수)
  const nodes = await getNodesFromDB(pageId);

  return (
    //클라이언트 스토어 업데이트 컴포넌트 실행
    <EditorStoreInitializer initialNodes={nodes}>
      {/* 다른 에디터 관련 컴포넌트들은 이곳에서 렌더링 됩니다!(사이드바,매니패스트 수정 컴포넌트 등등...) */}
      <Canvas />
    </EditorStoreInitializer>
  );
}
