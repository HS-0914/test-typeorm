export interface Payload {
    id: number,
    username: string,
    authorities?: any[]; // ?은 없을수있는 것들에 사용
}