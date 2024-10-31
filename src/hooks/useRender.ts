import { useEffect, useState } from 'react';

/** time마다 강제로 재랜더링 */
const useRender = (time: number) => {
  const [renderState, setRenderState] = useState(false);

  useEffect(() => {
    // 이 부분은 컴포넌트가 렌더링될 때마다 time마다 실행되도록 설정합니다.
    const timer = setInterval(() => {
      setRenderState((pre) => !pre);
    }, time); // time마다 실행

    return () => {
      // 컴포넌트 언마운트 시 clearInterval을 호출하여 타이머 정리
      clearInterval(timer);
    };
  }, [renderState, time]);

  /** 함수를 실행시 강제로 리랜더링 */
  const render = () => setRenderState((pre) => !pre);

  return { render };
};

export default useRender;
