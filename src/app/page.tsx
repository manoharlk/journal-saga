import Editor from "@/src/ui/editor";
import Github from "@/src/ui/shared/github";
import Upload from "@/src/ui/upload";

export default function Page() {
  return (
    <>
      <a
        href="https://github.com/seads-org/pinecone_hack"
        target="_blank"
        className="absolute bottom-5 right-5 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:top-5 sm:bottom-auto"
      >
        <Github />
      </a>
      <Upload />
      <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
        <Editor />
      </div>
    </>
  );
}
