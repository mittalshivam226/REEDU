import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createListingDto: CreateListingDto, userId: string): Promise<{
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
    findAll(query: any): Promise<{
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
    update(id: string, updateListingDto: any, userId: string): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
