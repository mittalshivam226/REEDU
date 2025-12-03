import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createListingDto: CreateListingDto, userId: string): Promise<any>;
    findAll(query: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateListingDto: any, userId: string): Promise<any>;
    remove(id: string, userId: string): Promise<any>;
}
