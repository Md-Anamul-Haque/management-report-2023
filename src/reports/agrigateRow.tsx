import { useEffect, useState } from "react";
import { TableCell, TableRow } from "../components/ui/table";
import { hasValue } from "../lib/utils";

const getSum = (rows: object[], key: string) => {
    const sum = rows.reduce((accumulator: number, currentValue: any) => {
        // console.log(currentValue?.[key])
        const subsum = currentValue?.[key] ? Number(currentValue[key]) : 0;
        return accumulator + subsum
    }, 0)
    return (sum)
}


// const AgrigateRow = (rows: object[], colkeys: string[], { $sumKeys }: { $sumKeys: string[] }) => {
const AgrigateRow = ({ rows, colkeys, $sumkeys }: { rows: object[]; colkeys: string[]; $sumkeys: string[] }) => {

    const [sums, setSums] = useState<{
        value: number;
        colIndex: number;
    }[]>()
    useEffect(() => {
        let newSums: {
            value: number;
            colIndex: number;
        }[] = [];
        colkeys.map((col, i) => {
            if (hasValue($sumkeys, col)) {
                // alert(getSum(rows, col))
                newSums.push({
                    value: getSum(rows, col),
                    colIndex: i
                })
            }
        })

        setSums([...newSums])
    }, [$sumkeys, colkeys, rows])
    return (
        <>
            {sums && <TableRow>
                <TableCell colSpan={sums ? sums?.[0]?.colIndex : 1}>Total(sum)</TableCell>
                {sums.map((sum, i) => {
                    if (i === 0) {
                        return <TableCell key={i}>{String(sum?.value)}</TableCell>
                    } else {
                        return <TableCell key={i} colSpan={sums?.[i]?.colIndex - sums?.[Number(i - 1)].colIndex}>{String(sum.value)}</TableCell>
                    }
                })}
            </TableRow >}
        </>

    )
}

export default AgrigateRow