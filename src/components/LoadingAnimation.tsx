import { Card, CardContent } from "./ui/card"

// import { Spinner } from 'flowbite-react'
const LoadingAnimation = () => {
    return (
        <Card>
            <CardContent>
                <section className=' animate-pulse grid place-items-center border shadow-xl rounded-xl w-full h-28'>
                    <div className='flex space-x-3'>
                        <h3 className='text-2xl font-bold font-mono'>processing...</h3>
                    </div>
                </section>
            </CardContent>
        </Card>
    )
}

export default LoadingAnimation