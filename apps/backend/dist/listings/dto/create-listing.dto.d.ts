export declare enum Condition {
    NEW = "NEW",
    LIKE_NEW = "LIKE_NEW",
    GOOD = "GOOD",
    FAIR = "FAIR",
    POOR = "POOR"
}
export declare class CreateListingDto {
    title: string;
    description?: string;
    price: number;
    condition: Condition;
    location: string;
    tags?: string[];
    edition?: string;
    isbn?: string;
    images?: string[];
}
