import HardcodedTestCanvas from "./_click_to_edit_engine/mock";

export default function Page() {
  return (
    <div className={"flex flex-col gap-2"}>
      <h1>테스트 환경</h1>
      <HardcodedTestCanvas />
    </div>
  );
}
