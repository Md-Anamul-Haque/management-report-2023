import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeadersOfPage from '../../components/HeadersOfPage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AgrigateRow from '../agrigateRow';
type short_descType = {
  amt?: Number | String;
  desc?: String;
}
export type DailyStatmentDataType = {
  cols: { name?: String; colKey?: String; isHidden?: 'yes' | 'no' | String }[];
  reportsHeaders?: String[];
  rows: {
    trans_no?: String;
    trans_date?: string;
    total?: String | Number;
    ref_name?: String;
    ref_id?: String;
    particular?: String;
    paper_no?: Number | String;
    // paid_amt?: Number | String;
    due_amt?: Number | String;
    short_desc?: short_descType[]
  }[]
};
// type colKeyType='trans_no'|'trans_date'|'total'|'ref_name'|'ref_id'|'particular'|'paper_no'|'paid_amt'|'due_amt'|'short_desc';
const DailyStatmentPaper = ({ data }: { data: DailyStatmentDataType }) => {
  const { cols, rows, reportsHeaders } = data;
  // const validCols = cols.filter(col => {
  //   if (col?.isHidden && col?.isHidden === 'yes') {
  //     return false
  //   } else {
  //     return true
  //   }
  // });
  const validCols = cols.filter(col => !(col?.isHidden === 'yes'));
  const [colKeys, setcolKeys] = useState<string[]>([])
  // const [sum, setSum] = useState<{
  //   total?: Number;
  //   due_amt?: Number;
  // }>({})
  // let colKeys: String[] = [];

  useEffect(() => {
    let newColkeys: string[] = [];
    validCols.map(col => {
      if (col?.colKey) {
        newColkeys.push(String(col.colKey));
      }
    });
    setcolKeys([...newColkeys])
    // ----------------------
    //   let newSum: typeof sum = {}
    //   if (newColkeys.indexOf('total') !== -1) {
    //     const sumTotal = rows.reduce((accumulator, currentValue) => {
    //       const total = currentValue?.total ? typeof currentValue.total === "number" ? currentValue.total : Number(currentValue.total) : 0;
    //       return accumulator + total;
    //     }, 0)
    //     newSum.total = sumTotal
    //   }
    //   // ----------------------
    //   if (newColkeys.indexOf('due_amt') !== -1) {
    //     const sumDue_amt = rows.reduce((accumulator, currentValue) => {
    //       const due_amt = currentValue?.due_amt ? typeof currentValue.due_amt === "number" ? currentValue.due_amt : Number(currentValue.due_amt) : 0;
    //       return accumulator + due_amt;
    //     }, 0)
    //     newSum.due_amt = sumDue_amt
    //   }
    //   setSum({ ...newSum })
  }, [data])
  return (
    <div className="content">
      {colKeys && <Table className='border'>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {reportsHeaders && <TableHead colSpan={validCols.length} className='p-4'>
              <HeadersOfPage reportsHeaders={reportsHeaders} />
            </TableHead>}
          </TableRow>
          <TableRow>
            {validCols.map(col => (
              <TableHead
                style={{
                  // @ts-ignore
                  textAlign: typeof rows?.[0]?.[col.colKey] == 'number' ? 'right' : typeof rows?.[0]?.[col.colKey] == 'string' ? 'left' : 'center',
                }}
                key={uuidv4()}>{col.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody >
          {rows?.map(row => {
            return <TableRow className='items-start border align-top' key={uuidv4()}>
              {colKeys.map((ck) => {
                if (ck === 'short_desc') {
                  return <TableCell key={uuidv4()}>
                    <Table>
                      <TableBody className='border rounded-md'>
                        {row?.short_desc?.map(dosc => <TableRow key={uuidv4()}>
                          <TableCell className=' w-full'>{dosc?.desc}</TableCell>
                          <TableCell className=' w-1'>-</TableCell>
                          <TableCell className='text-right' >{String(dosc?.amt)}</TableCell>
                        </TableRow>)}
                      </TableBody>
                    </Table>
                  </TableCell>

                }

                return <TableCell key={uuidv4()}
                  style={{
                    // @ts-ignore
                    textAlign: typeof row?.[ck] == 'number' ? 'right' : 'left'
                  }}
                  className='align-top'>
                  {/* @ts-ignore */}
                  {String(row?.[ck] || '')}
                </TableCell>
              })}
            </TableRow>
          })}
          {/* <TableRow>
            <TableCell colSpan={colKeys.indexOf('due_amt') < colKeys.indexOf('total') ? colKeys.indexOf('due_amt') : colKeys.indexOf('total')} className='text-right'>{'total(sum)'} :</TableCell>
            {
              colKeys.indexOf('due_amt') < colKeys.indexOf('total') && hasValue(colKeys, 'due_amt') && <TableCell className='border text-right'>{String(sum?.due_amt || '')}</TableCell>
            }
            <TableCell colSpan={colKeys.indexOf('total') - colKeys.indexOf('due_amt')} className='text-right'>{String(sum.total)}</TableCell>
          </TableRow>
           */}

          <AgrigateRow rows={rows} colkeys={colKeys} $sumkeys={['total', 'due_amt']} />
        </TableBody>
      </Table>}
    </div>
  )
}

export default DailyStatmentPaper