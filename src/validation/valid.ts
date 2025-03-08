export const validUserName = (str: string): boolean => {
    const regex: RegExp = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
    
    if (regex.test(str)) {
        return true
    }

    return false
}