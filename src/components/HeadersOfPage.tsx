import { v4 as uuidv4 } from 'uuid';
import { H3, H4, H5, P } from './ui/Typography';

const HeadersOfPage = ({ reportsHeaders }: { reportsHeaders: String[] }) => {
    return (
        <div className='w-full justify-center text-center'>
            {reportsHeaders?.map((header, i) => {
                if (i == 0) {
                    return <H3 className='text-black/90' key={uuidv4()}>{header || ''}</H3>
                } else if (i > 0 && i <= 2) {
                    return <H4 className='text-black/90' key={uuidv4()}>{header || ''}</H4>
                } else if (i == 3) {
                    return <H5 className='text-black/90' key={uuidv4()}>{header || ''}</H5>
                } else {
                    return <P className='text-sm' key={uuidv4()}>{header || ''}</P>
                }
            })}
        </div>
    )
}

export default HeadersOfPage