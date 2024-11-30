export async function getStorageItem(key: string) {
    return localStorage.getItem(key);
}
export async function setStorageItem(key: string, value?: string) {
    if (value) {
        localStorage.setItem(key, value);
    } else {
        localStorage.removeItem(key);
    }
}
