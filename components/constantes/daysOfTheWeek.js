export const FREQUENCY_OPTIONS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
export const DAYS_OF_THE_WEEK = ['D','L', 'M', 'X', 'J', 'V', 'S']
export const convertDate = (fecha) => {
    const partesFecha = fecha.split(' ');
    const nuevaFecha = `${partesFecha[2]} ${partesFecha[1]}`;
    return nuevaFecha
}