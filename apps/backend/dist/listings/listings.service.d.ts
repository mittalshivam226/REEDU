import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createListingDto: CreateListingDto, userId: string): Promise<{
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
    findAll(query: any): Promise<{
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
    update(id: string, updateListingDto: any, userId: string): Promise<{
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
    remove(id: string, userId: string): Promise<{
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
}
