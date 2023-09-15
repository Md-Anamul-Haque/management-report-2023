import { useEffect, useState } from "react";
import ErrorElement from "../../components/ErrorElement";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageProvider from "../../components/PageProvider";
import { getData } from "../../lib/utils";
import DailyStatmentPaper, { DailyStatmentDataType } from "./DailyStatmentPaper";

const DailyStatment = () => {
    const [data, setData] = useState<DailyStatmentDataType | null>(null)
    const [isError, setIsError] = useState<string | null>()
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const handleData = async () => {
        const fetchData = await getData('daily_statement')
        console.log({ fetchData })
        if (fetchData.success) {
            setData(fetchData.JSON)
        } else {
            setIsError(fetchData.error)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleData();
    }, [window.location.href])
    if (IsLoading) {
        return <LoadingAnimation />
    }
    if (isError) {
        return <ErrorElement message={isError} />
    }

    if (data) {
        return (
            <PageProvider pageName={'daily_statement'} w="8.4in" h="11.69in">
                <DailyStatmentPaper data={data} />
            </PageProvider>
        )
    }
}

export default DailyStatment

