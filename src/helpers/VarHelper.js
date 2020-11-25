export const apiUrl = "http://3.235.152.9:3000";

export async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}