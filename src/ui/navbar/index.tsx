import Github from "../shared/github"
const Navbar = () => {
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
        </>)
}

export default Navbar;