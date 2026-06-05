export const formatDateForAPI = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export const convertDateToCustomFormat = (dateStr: string): string => {
    const months: { [key: string]: string } = {
        января: "01",
        февраля: "02",
        марта: "03",
        апреля: "04",
        мая: "05",
        июня: "06",
        июля: "07",
        августа: "08",
        сентября: "09",
        октября: "10",
        ноября: "11",
        декабря: "12",
    };

    const [day, monthName] = dateStr.split(" ");

    console.log(`date = ${dateStr}, day = ${day}, monthName = ${monthName}`);

    const month = months[monthName.toLowerCase()];
    const year = new Date().getFullYear();
    const formattedDay = String(day).padStart(2, "0");

    return `${year}-${month}-${formattedDay}`;
};
