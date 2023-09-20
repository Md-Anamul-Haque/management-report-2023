import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeadersOfPage from '../../components/HeadersOfPage';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
type group_dataType = {
  academic_year?: string;
  admissin_id?: string;
  admission_date?: string;
  name?: string;
  roll_no?: Number | string;
  student_id?: string;
}
type rowType = {
  class_name: string;
  group_data?: group_dataType[];
}
export type Student_listDataType = {
  cols: { name?: String; colKey?: String; isHidden?: 'yes' | 'no' | String }[];
  reportsHeaders?: String[];
  rows: rowType[]
};
// type colKeyType='trans_no'|'trans_date'|'total'|'ref_name'|'ref_id'|'particular'|'paper_no'|'paid_amt'|'due_amt'|'short_desc';
const Student_listPaper = ({ data }: { data: Student_listDataType }) => {
  const { cols, rows, reportsHeaders } = data;
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
    console.log({ row1: rows[0] })
  }, [data])
  return (
    <div className="content">
      {colKeys && <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {reportsHeaders && <TableHead colSpan={validCols.length} className='p-4'>
              <HeadersOfPage reportsHeaders={reportsHeaders} />
            </TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody >
          {rows?.map((row: rowType) => {
            return (
              <TableRow key={uuidv4()}>
                <TableCell colSpan={validCols.length} className='pb-48'>
                  <Table className='border print:break-before-page print:break-after-auto'>
                    <TableHeader>
                      <TableRow className='items-start border align-top' key={uuidv4()}>
                        <TableHead colSpan={colKeys.length} className='text-center text-xl font-medium tracking-tight  '>{row.class_name}</TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>ত্র:নং</TableHead>
                        {validCols.map(col => {
                          // @ts-ignore
                          const d_type = typeof rows?.[0]?.group_data?.[0]?.[col?.colKey];
                          const align = d_type == 'number' ? 'right' : d_type == 'string' ? 'left' : 'center';
                          return (
                            <TableHead
                              style={{
                                // @ts-ignore
                                textAlign: align,
                              }}
                              key={uuidv4()}>{col?.name}</TableHead>
                          )
                        })}
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                      {row.group_data && row.group_data.map((data, i) => {
                        return (<TableRow key={uuidv4()}>
                          <TableCell>{String(i + 1)}</TableCell>
                          {colKeys.map(ck => (

                            <TableCell key={uuidv4()}
                              style={{
                                // @ts-ignore
                                textAlign: typeof data?.[ck] == 'number' ? 'right' : 'left'
                              }}
                            // @ts-ignore
                            >{data?.[ck]}</TableCell>
                          ))}
                        </TableRow>)
                      })}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )
          })}
          {/* <AgrigateRow rows={rows} colkeys={colKeys} $sumkeys={['exp_amt', 'rec_amt']} /> */}

        </TableBody>
      </Table>}
    </div>
  )
}

export default Student_listPaper