import { Request } from 'express';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
export declare class ListingsController {
    private readonly listingsService;
    constructor(listingsService: ListingsService);
    create(createListingDto: CreateListingDto, req: Request): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
