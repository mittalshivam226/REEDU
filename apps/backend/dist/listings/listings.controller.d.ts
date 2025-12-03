import { Request } from 'express';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    create(createListingDto: CreateListingDto, req: Request): Promise<{
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tags: string;
        description: string | null;
        title: string;
        price: number;
        condition: string;
        location: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
    }>;
    findAll(): Promise<{
        tags: any;
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        price: number;
        condition: string;
        location: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        tags: any;
        user: {
            id: string;
            email: string;
            password: string;
            name: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        price: number;
        condition: string;
        location: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
    }>;
}
