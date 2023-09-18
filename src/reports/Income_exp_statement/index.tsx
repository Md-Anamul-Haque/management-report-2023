import { useEffect, useState } from "react";
import ErrorElement from "../../components/ErrorElement";
import LoadingAnimation from "../../components/LoadingAnimation";
import PageProvider from "../../components/PageProvider";
import { getData } from "../../lib/utils";
import Income_exp_statementPaper, { Income_exp_statementDataType, rowType } from "./Income_exp_statementPaper";
// https://gbb721bc4e0ffd9-db7ijy7.adb.ap-mumbai-1.oraclecloudapps.com/ords/app/rpt_api/income_exp_statement?p_oc=30303031&p_fund_id=F-1&p_from_date=01/01/2023&p_to_date=31/01/2023
const Income_exp_statement = () => {
    const [data, setData] = useState<Income_exp_statementDataType | null>(null)
    const [isError, setIsError] = useState<string | null>()
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const handleData = async () => {
        const fetchData = await getData('income_exp_statement')
        console.log({ fetchData })
        if (fetchData.success) {
            const jsonData: Income_exp_statementDataType = fetchData.JSON;
            // -----------
            let rows: rowType[];
            let rowsOfExp_amt: rowType[] = [];
            let rowsOfRec_amt: rowType[] = [];

            // start for sroting
            jsonData?.rows.map(row => {
                if (row?.rec_amt) {
                    rowsOfRec_amt.push(row)
                } else {
                    rowsOfExp_amt.push(row)
                }
            })
            rows = [...rowsOfRec_amt, ...rowsOfExp_amt]
            // end for sorting
            setData({ ...jsonData, rows })
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
                <Income_exp_statementPaper data={data} />
            </PageProvider>
        )
    }
}

export default Income_exp_statement

