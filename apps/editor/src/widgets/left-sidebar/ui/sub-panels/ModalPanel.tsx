import { PanelBaseLayout } from './base/PanelBaseLayout';
import { DynamicContent } from './base/DynamicContent';
import { useModalStore } from '@/entities/modal';

export const ModalPanel = () => {
  const { modals, selectModal, createModal }: any = useModalStore();

  return (
    <PanelBaseLayout title="모달" description="목록">
      <DynamicContent
        items={modals.map(m => ({ id: m.id, label: m.name }))}
        onItemClick={(item) => selectModal(item.id)}
      />
      {/* 추가 버튼 등 패널 고유 UI는 Layout 아래에 배치 */}
      <div className="p-3">
        <button onClick={createModal} className="w-full py-2 border-2 border-dashed rounded-lg text-xs text-zinc-400">
          + 새 모달 추가
        </button>
      </div>
    </PanelBaseLayout>
  );
};