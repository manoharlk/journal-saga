import Link from "next/link";

export default function Dashboard() {
    return <>
        <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
            <div className="flex items-center justify-center max-w-4xl mx-auto p-4">
                <div className="flex items-center gap-4 py-2">
                    <div >
                        <div>
                            <p>Let's create a new journal entry. We'll help you with prompts and processing your thoughts</p>
                        </div>
                        <div className="flex justify-center">
                            <Link href="/journal">
                                <div className="px-4 py-2 mx-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                                    Let's journal
                                </div>
                            </Link>
                        </div>
                        <div className="my-5">
                            <p>Let's process existing journals. You can also import data from your existing journal if you want as a text or json or csv file</p>
                        </div>
                        <div className="flex justify-center my-4">
                            <Link href="/upload">
                                <div className="px-4 py-2 mx-2 text-white bg-green-500 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                    Process existing journals.
                                </div>
                            </Link>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    </>
}