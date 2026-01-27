// 타입별 기본값 관리 (캐싱)
// 첫 요청 시 서버에 컴포넌트 기본값 요청
// 두 번째 요청부터는 캐시에서 가져오기
import { useState, useCallback } from 'react';
// 일단 클라이언트에 컴포넌트 기본값이 저장되어있다고 가정. 추후에 서버에서 받을 땐 변경 필요
import { COMPONENT_DEFAULTS, type ComponentDefaults } from '@/shared/lib/component-defaults';
import { WcxNode } from "@repo/ui/types/nodes";

// WcxNode에서 type 필드만 가져오기
type ComponentType = WcxNode["type"];


interface UseComponentDefaultsReturn {
  getDefaults: (type: ComponentType) => Promise<ComponentDefaults>;
  isLoading: boolean;
  cache: Map<ComponentType, ComponentDefaults>;
}

export function useComponentDefaults(): UseComponentDefaultsReturn {
  const [cache] = useState(new Map<ComponentType, ComponentDefaults>());
  const [isLoading, setIsLoading] = useState(false);

  const getDefaults = useCallback(async (type: ComponentType): Promise<ComponentDefaults> => {
    // 캐시 확인
    if (cache.has(type)) {
      return cache.get(type)!;
    }

    setIsLoading(true);

    try {
      // 현재는 로컬 상수 사용, 나중에 서버 요청으로 변경 가능
      const defaults = COMPONENT_DEFAULTS[type];

      // 나중에 서버에서 가져오도록 개선할 때:
      // const defaults = await componentApi.fetchDefaults(type);

      // 캐시에 저장
      cache.set(type, defaults);

      return defaults;
    } finally {
      setIsLoading(false);
    }
  }, [cache]);

  return {
    getDefaults,
    isLoading,
    cache,
  };
}