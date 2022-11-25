export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}
export const reportError = ({ message }: { message: string }) => {
    return ({ error: message })
}