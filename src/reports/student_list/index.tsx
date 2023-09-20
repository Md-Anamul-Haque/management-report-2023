import { useEffect, useState } from "react";
import ErrorElement from "../../components/ErrorElement";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageProvider from "../../components/PageProvider";
import { getData } from "../../lib/utils";
import Student_listPaper, { Student_listDataType } from "./Student_listPaper";
// https://gbb721bc4e0ffd9-db7ijy7.adb.ap-mumbai-1.oraclecloudapps.com/ords/app/rpt_api/Student_list?p_oc=30303031&p_fund_id=F-1&p_from_date=01/01/2023&p_to_date=31/01/2023
const Student_list = () => {
    const [data, setData] = useState<Student_listDataType | null>(null)
    const [isError, setIsError] = useState<string | null>()
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const handleData = async () => {
        // https://gbb721bc4e0ffd9-db7ijy7.adb.ap-mumbai-1.oraclecloudapps.com/ords/app/rpt_api/student_list?p_oc=30303031&p_section_id=
        const fetchData = await getData('student_list')
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
            <PageProvider pageName={`report-student_list-${Date.now()}`} w="8.4in" h="11.60in">
                <Student_listPaper data={data} />
            </PageProvider>
        )
    }
}

export default Student_list

