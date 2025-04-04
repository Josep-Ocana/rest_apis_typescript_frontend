export function formatCurrency(amount : number) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount)
}

export function toBoolean(str : String){
    return str.toLowerCase() === "true"
}