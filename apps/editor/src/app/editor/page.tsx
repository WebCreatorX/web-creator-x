import getNodesFromDB from "@/actions/editor/getNodesFromDB";
import Canvas from "@/components/editor/Canvas";
import EditorStoreInitializer from "@/components/editor/EditorStoreInitializer";
import { RuntimeProvider } from "@repo/ui/context/runtimeContext";

export default async function EditorPage() {
  const pageId = 201; //목데이터입니다.
  //서버 액션 함수(nodes데이터 패칭함수)
  const nodes = await getNodesFromDB(pageId);

  return (
    <div className="flex h-screen w-screen flex-col gap-10">
      <h1 className="text-3xl text-amber-700">에디터 페이지 입니다.</h1>
      <EditorStoreInitializer initialNodes={nodes}>
        {/* 다른 에디터 관련 컴포넌트들은 이곳에서 렌더링 됩니다!(사이드바,매니패스트 수정 컴포넌트 등등...) */}
        <RuntimeProvider>
          <div className="relative h-full w-full border-2">
            <Canvas />
          </div>
        </RuntimeProvider>
      </EditorStoreInitializer>
    </div>
  );
}
