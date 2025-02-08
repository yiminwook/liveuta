"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; //세그먼트를 다시 렌더링하여 복구 시도
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
      // 500에러 콘솔은 개발환경에서만 표시됩니다.
      console.error("Error-Boundary", error);
    }
  }, [error]);

  return (
    <>
      <title>500 | Server Error</title>
      <div>
        <h2>Internal Server Error</h2>
        <div>
          <p>
            {process.env.NEXT_PUBLIC_VERCEL_ENV !== "production"
              ? error.message // 개발 스테이징 환경에서만 보이게 한다.
              : "Something wrong"}
          </p>
        </div>
        <div>
          <button type="button" onClick={reset}>
            다시시도
          </button>
        </div>
      </div>
    </>
  );
}
