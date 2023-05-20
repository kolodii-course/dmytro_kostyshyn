export function formatDate(dateString) {
    return new Date(dateString).toLocaleString().replaceAll('/', "-").replace(', ', ' ')
}
