export const formatDate = (date: Date) => {
    const dateTicket = new Date(date)

    const day = dateTicket.getDay() < 10 ? '0' + dateTicket.getDay() : dateTicket.getDay()
    const month = dateTicket.getMonth() < 10 ? '0' + dateTicket.getMonth() : dateTicket.getMonth()
    const hours = dateTicket.getHours() < 10 ? '0' + dateTicket.getHours() : dateTicket.getHours()
    const minutes = dateTicket.getMinutes() < 10 ? '0' + dateTicket.getMinutes() : dateTicket.getMinutes()

    return `${day}/${month}/${dateTicket.getFullYear()} - ${hours}h${minutes}`
}
