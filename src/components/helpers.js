export function formatDate(date) {
    const raw = new Date(date);
    
    const year = raw.getFullYear()
    const month = (raw.getMonth() + 1).toString().padStart(2, "0");
    const day = raw.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
}