import formateDate from './format-date';
export function getWeek(dateStr?: string) {

    const nowDate = dateStr ? new Date(dateStr) : new Date();
    const day = nowDate.getDay();

    // 星期一
    const mondaySet = day === 0 ? 6 : day - 1;

    nowDate.setDate(nowDate.getDate() - mondaySet);
    const monday = nowDate;
    console.log(monday);

    const mondayStr = formateDate(monday, {
        format: 'yyyy-MM-dd 00:00:00',
    });

    const mYear = monday.getFullYear();
    const mMonth = monday.getMonth() + 1;
    const mDay = monday.getDate();

    const mondayTime = new Date(mYear, mMonth, mDay, 0, 0, 0);
    const mondayTimeStarmp = mondayTime.getTime();
    console.log(mYear, mMonth, mDay, mondayTime);




    // 星期日
    nowDate.setDate(nowDate.getDate() + 6);
    const sunday = nowDate;
    console.log(sunday);



    const sundayStr = formateDate(sunday, {
        format: 'yyyy-MM-dd 23:59:59',
    });

    const sYear = sunday.getFullYear();
    const sMonth = sunday.getMonth() + 1;
    const sDay = sunday.getDate();

    const sundayTime = new Date(sYear, sMonth, sDay, 23, 59, 59);
    const sundayTimeStarmp = sundayTime.getTime();

    console.log(sYear, sMonth, sDay, sundayTime);

    console.log(new Date(sundayStr));
    console.log(new Date(sundayStr).getTime()); // NaN

    const result = {
        sunday,
        monday,
        mondayStr,
        sundayStr,
        mondayTimeStarmp,
        sundayTimeStarmp,
    };

    console.log(result);

    return result;
}
