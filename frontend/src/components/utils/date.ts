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
export const validateSignatureCheck = (signature: string) => {
    const data = {
        time: '',
        from: '',
        to: '',
        value: '',
    };
    const arr = signature.split('|');
    arr.forEach((item) => {
        const dataArr = item.split(':');
        if (dataArr[0].trim() === 'Time') {
            data.time = dataArr[1].trim();
            data.time = convertUpdatedTime(data.time);
        }
        if (dataArr[0].trim() === 'From') {
            data.from = dataArr[1].trim();
        }
        if (dataArr[0].trim() === 'To') {
            data.to = dataArr[1].trim();
        }
        if (dataArr[0].trim() === 'Value') {
            data.value = dataArr[1].trim();
        }
    });
    return data;
};
