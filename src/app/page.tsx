import Editor from "@/src/ui/editor";
import Github from "@/src/ui/shared/github";
import Upload from "@/src/ui/upload";

export default function Page() {
  return (
    <>
    <nav>
      <div className="flex items-center justify-center max-w-4xl mx-auto p-4 NavBar">
        <div className="flex items-center gap-4 py-2">
          <a href="/" className="text-2xl font-bold">
            Journal Saga
          </a>
        </div>
      </div>
      <a
        href="https://github.com/seads-org/pinecone_hack"
        target="_blank"
        className="absolute top-5 right-5 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100"
      >
        <Github />
      </a>
    </nav>

      <Upload />
      <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
        <Editor />
      </div>
    </>
  );
}
