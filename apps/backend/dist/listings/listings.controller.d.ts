import { Request } from 'express';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    create(createListingDto: CreateListingDto, req: Request): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: string;
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
        condition: string;
        location: string;
        tags: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        tags: any;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: string;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: string;
        location: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        tags: any;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: string;
        };
        images: {
            id: string;
            url: string;
            listingId: string;
        }[];
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: string;
        location: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateListingDto: any, req: Request): Promise<{
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            password: string;
            role: string;
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
        condition: string;
        location: string;
        tags: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: Request): Promise<{
        id: string;
        title: string;
        description: string | null;
        price: number;
        condition: string;
        location: string;
        tags: string;
        edition: string | null;
        isbn: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
