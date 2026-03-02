import { detectExpiredLoanRecord, modifyFinesAmount } from "./schema/book/bookLoaned";
import { detectExpiredSuspendRecord } from "./schema/user/suspendList";

const taskList: (() => void)[] =
[
    detectExpiredSuspendRecord,
    modifyFinesAmount,
    detectExpiredLoanRecord
]

export const scheduleDailyMidnightTasks = () => 
{
    const now = new Date();

    const UTCYear = now.getUTCFullYear();
    const UTCMonth = now.getUTCMonth();
    const getDate = now.getUTCDate();

    const nextMidnight_UTC8 = new Date(UTCYear, UTCMonth, getDate + 1, 0, 0, 0, 0);
    nextMidnight_UTC8.setHours(nextMidnight_UTC8.getUTCHours() + 8);

    const delay = nextMidnight_UTC8.getTime() - now.getTime();

    setTimeout(() => 
    {
        // Implement each task
        taskList.forEach(task => task());

        // Run at fixed interval (every 24h)
        setInterval(() => { taskList.forEach(task => task()) }, 24 * 60 * 60 * 1000);
    }, delay);
};