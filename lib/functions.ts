export function getDate(dateString){
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return "" + day + " " + month + " " + year;
}