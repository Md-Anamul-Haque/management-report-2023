import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeadersOfPage from '../../components/HeadersOfPage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import AgrigateRow from '../agrigateRow';
export type rowType = {
  tariff_desc: string;
  exp_amt?: number | string;
  rec_amt?: number | string;
}
export type Income_exp_statementDataType = {
  cols: { name?: String; colKey?: String; isHidden?: 'yes' | 'no' | String }[];
  reportsHeaders?: String[];
  rows: rowType[]
};
// type colKeyType='trans_no'|'trans_date'|'total'|'ref_name'|'ref_id'|'particular'|'paper_no'|'paid_amt'|'due_amt'|'short_desc';
const Income_exp_statementPaper = ({ data }: { data: Income_exp_statementDataType }) => {
  let { cols, rows, reportsHeaders } = data;

  const validCols = cols.filter(col => !(col?.isHidden === 'yes'));
  const [colKeys, setcolKeys] = useState<string[]>([])
  useEffect(() => {
    let newColkeys: string[] = [];
    validCols.map(col => {
      if (col?.colKey) {
        newColkeys.push(String(col.colKey));
      }
    });
    setcolKeys([...newColkeys])
    // ----------------------

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
          {rows && rows?.map(row => {
            return <TableRow className='items-start border align-top' key={uuidv4()}>
              {colKeys.map((ck) => {
                return <TableCell key={uuidv4()}
                  style={{
                    // @ts-ignore
                    textAlign: typeof row?.[ck] == 'number' ? 'right' : 'left'
                  }}
                // className='align-top'
                >
                  {/* @ts-ignore */}
                  {String(row?.[ck] || '')}
                </TableCell>
              })}
            </TableRow>
          })}
          <AgrigateRow rows={rows} colkeys={colKeys} $sumkeys={['exp_amt', 'rec_amt']} />
        </TableBody>
      </Table>}
    </div >
  )
}

export default Income_exp_statementPaper