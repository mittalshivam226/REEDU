import { Request } from 'express';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    create(createListingDto: CreateListingDto, req: Request): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: import(".prisma/client").$Enums.Condition;
        location: string;
        tags: string[];
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: import(".prisma/client").$Enums.Condition;
        location: string;
        tags: string[];
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: import(".prisma/client").$Enums.Condition;
        location: string;
        tags: string[];
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
