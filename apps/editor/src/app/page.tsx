import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>환경합니다</h1>
      <Link href="test_click_to_edit">테스트 환경</Link>
      <br />
      <Link href="/editor">에디터 페이지</Link>
      <div>
        <Link href="sidebar">사이드바 테스트</Link>
      </div>
    </div>
  );
}
