export const convertUpdatedTime = (time: string): string => {
    // 2021-07-01T08:00:00.000Z => 01/07/2021 08:00:00
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
};
