

export interface User {
    email: string;
    role?: string;
}

export interface checkings {
    bookname: string;
    authorname: string;
    useremail: string;
    checkedoutsince: string | null;
}

export interface book {
    bookname: string;
    authorname: string;
    religion?: string;
    shelf?: string;
    wing?: string;
    numcopies?: number;
    checkedoutcopies?: number;
}