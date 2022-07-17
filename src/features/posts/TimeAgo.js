import { parseISO, formatDistanceToNow,parse } from 'date-fns';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        //const date = parse(timestamp)
        console.log(date)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
export default TimeAgo