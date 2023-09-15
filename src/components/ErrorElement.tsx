const ErrorElement = ({ message }: { message: string }) => {
    return (<div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
        <p className="font-bold">{message}</p>
        <p>Something not ideal might be happening.</p>
    </div>)
}

export default ErrorElement