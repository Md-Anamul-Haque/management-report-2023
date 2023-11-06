import { useEffect, useState } from "react";
import ErrorElement from "../../components/ErrorElement";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageProvider from "../../components/PageProvider";
import { getData } from "../../lib/utils";
import Student_adv_due_payment, { student_adv_due_paymentsDataType } from "./emp_adv_due_payment";
// https://gbb721bc4e0ffd9-db7ijy7.adb.ap-mumbai-1.oraclecloudapps.com/ords/app/rpt_api/student_adv_due_payment?p_oc=30303031&p_from_date=01/01/2023&p_to_date=31/01/2023&p_section_id=NSR-1
// const months = { JAN: '1', FEB: '2', MAR: '3', APR: '4', MAY: '5', JUN: '6', JUL: '7', AUG: '8', SEP: '9', OCT: '10', NOV: '11', DEC: '12' };
// const setDataWithSort = async (rows: rowType[]) => {
//     let tmp_rows = [...rows];

//     tmp_rows.forEach(row => {

//     });
//     // const month_id_to_number = (m_id) => {
//     //     let twoValue = m_id.split('-');
//     //     twoValue[0] = Number(twoValue[0])
//     //     twoValue[1] = months[twoValue[1]].padStart(2, 0);
//     //     return (Number(twoValue.join('')))
//     // }
//     // await tmp_rows.sort((a, b) => {
//     //     let x = month_id_to_number(a.group_data);
//     //     let y = month_id_to_number(b.month_id);
//     //     if (x < y) { return -1 }
//     //     if (x > y) { return 1 }
//     //     return 0
//     // })
//     // return tmp_rows
// }

const Emp_adv_due_payments = () => {
    const [data, setData] = useState<student_adv_due_paymentsDataType | null>(null)
    const [isError, setIsError] = useState<string | null>()
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const handleData = async () => {
        const fetchData = await getData('emp_adv_due_payment')
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
        console.log('hi, this is ok')
    }, [window.location.href])
    if (IsLoading) {
        return <LoadingAnimation />
    }
    if (isError) {
        return <ErrorElement message={isError} />
    }

    if (data) {
        return (
            <PageProvider pageName={`report-student_adv_due_payment-${Date.now()}`} w={`${(data?.rows?.[0]?.group_data?.length || 4) * 1.8 + 4.4}in`} h="11.60;in">
                <Student_adv_due_payment data={data} />
            </PageProvider>
        )
    }
}

export default Emp_adv_due_payments

