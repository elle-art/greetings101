export interface User {
    id: number;
    name: string;
    email: string;
    yearJoined: number;
    colorMode: string;
    pfpId: string; 
    pfColor: string;
    courses: Array<Array<string>>;
}