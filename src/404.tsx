
const NotFound = () => {
    return (
        <div>
            <section className="flex items-center h-full min-h-screen p-16 dark:bg-gray-900 dark:text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this report/page.</p>
                        <p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage
                            <a href="https://nocrashsoft.com" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Nocrashsoft</a>
                            .</p>
                        <a rel="noopener noreferrer" href="https://nocrashsoft.com" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default NotFound