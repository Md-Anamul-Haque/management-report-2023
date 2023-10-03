import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeadersOfPage from '../../components/HeadersOfPage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AgrigateRow from '../agrigateRow';
// interface DataItem {
//     amt: number;
//     month_id: string; // like "2023-JAN"
//   }

type groupDataItem = {
    amt: number | string;
    month_id: string;
}
export type rowType = {
    academic_year?: string;
    group_data?: groupDataItem[];
    name?: string;
    ref_id?: string;
    roll_no?: number | string;
    sub_total?: number | string;
}
export type student_adv_due_paymentsDataType = {
    cols: { name?: String; colKey?: String; isHidden?: 'yes' | 'no' | string }[];
    reportsHeaders?: String[];
    rows: rowType[]
};
const months = { JAN: '1', FEB: '2', MAR: '3', APR: '4', MAY: '5', JUN: '6', JUL: '7', AUG: '8', SEP: '9', OCT: '10', NOV: '11', DEC: '12' };

const Student_adv_due_payment = ({ data }: { data: student_adv_due_paymentsDataType }) => {
    let { cols, rows, reportsHeaders } = data;
    let validCols = cols.filter(col => !(col?.isHidden === 'yes'));
    const [colKeys, setcolKeys] = useState<string[]>([])
    let monthNames = rows?.[0]?.group_data || [];
    monthNames.sort((a: groupDataItem, b: groupDataItem) => {
        const [yearA, monthA] = a.month_id.split('-');
        const [yearB, monthB] = b.month_id.split('-');

        // Comparing years first
        if (yearA !== yearB) {
            return parseInt(yearA) - parseInt(yearB);
        }

        // If years are the same, comparing months using the months object
        // @ts-ignore
        return months[monthA] - months[monthB];
    });
    let newValidCols: typeof validCols = [];
    validCols.forEach(validCol => {
        if (validCol.colKey === 'month_id') {
            monthNames.forEach(monthName => {
                newValidCols.push({
                    colKey: monthName.month_id,
                    name: monthName.month_id
                })
            })
        } else {
            newValidCols.push(validCol)
        }
    })
    // ---------------------
    const newRows = rows.map(row => {
        let newRow: object | any = { ...row }
        monthNames.forEach(monthName => {
            newRow[monthName.month_id] = monthName?.amt
        })
        delete newRow.group_data
        return newRow
    })

    console.log({ newRows, newValidCols })

    useEffect(() => {
        let newColkeys: string[] = [];
        newValidCols.map(col => {
            if (col?.colKey) {
                // if (col.colKey === 'month_id') {
                //     monthNames.map(monthName => newColkeys.push(monthName.month_id))
                // } else {
                newColkeys.push(String(col.colKey));
                // }
            }
        });
        setcolKeys([...newColkeys])
    }, [data])
    return (
        <div className="content">
            {colKeys && <Table>
                <TableHeader className='border' >
                    <TableRow className='border w-full mx-auto'>
                        {/* @ts-ignore */}
                        {reportsHeaders && <TableHead colSpan={'100%'} className='p-4'>
                            <HeadersOfPage reportsHeaders={reportsHeaders} />
                        </TableHead>}
                    </TableRow>
                    <TableRow>
                        {newValidCols.map(col => {
                            if (col.colKey === 'month_id') {
                                return monthNames.map(monthName => (
                                    <TableHead className='border'
                                        style={{
                                            // @ts-ignore
                                            textAlign: typeof newRows?.[0]?.[col?.colKey] == 'number' ? 'right' : typeof newRows?.[0]?.[col?.colKey] == 'string' ? 'left' : 'center',
                                        }} key={uuidv4()}>{monthName.month_id}</TableHead>
                                ))
                            } else {

                            }
                            return <TableHead className='p-4 border'
                                style={{
                                    // @ts-ignore
                                    textAlign: typeof newRows?.[0]?.[col?.colKey] == 'number' ? 'right' : typeof newRows?.[0]?.[col?.colKey] == 'string' ? 'left' : 'center',
                                }}
                                key={uuidv4()}>{col.name}</TableHead>
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody className='border' >
                    {newRows && newRows.map(row => {
                        return <TableRow key={uuidv4()}>
                            {row && newValidCols.map(col => (
                                <TableCell className='border' style={{
                                    // @ts-ignore
                                    textAlign: typeof newRows?.[0]?.[col?.colKey] == 'number' ? 'right' : typeof newRows?.[0]?.[col?.colKey] == 'string' ? 'left' : 'center',
                                }} key={uuidv4()}>
                                    {/* @ts-ignore */}
                                    {row?.[col?.colKey]}</TableCell>
                            ))}
                        </TableRow>
                    })}
                    <AgrigateRow rows={newRows} colkeys={colKeys} $sumkeys={['sub_total', ...monthNames.map(mn => mn.month_id), 'amt']} />

                </TableBody>
            </Table>}
        </div>
    )
}

export default Student_adv_due_payment



