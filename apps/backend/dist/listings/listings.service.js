"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ListingsService = class ListingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createListingDto, userId) {
        const { images, tags, ...listingData } = createListingDto;
        return this.prisma.listing.create({
            data: {
                ...listingData,
                tags: JSON.stringify(tags || []),
                userId,
                images: {
                    create: images?.map(url => ({ url })) || [],
                },
            },
            include: {
                user: true,
                images: true,
            },
        });
    }
    async findAll(query) {
        const listings = await this.prisma.listing.findMany({
            where: query,
            include: { images: true, user: true },
        });
        return listings.map(listing => ({
            ...listing,
            tags: JSON.parse(listing.tags || '[]'),
        }));
    }
    async findOne(id) {
        const listing = await this.prisma.listing.findUnique({
            where: { id },
            include: { images: true, user: true },
        });
        if (listing) {
            return {
                ...listing,
                tags: JSON.parse(listing.tags || '[]'),
            };
        }
        return null;
    }
    async update(id, updateListingDto, userId) {
        return this.prisma.listing.update({
            where: { id },
            data: updateListingDto,
        });
    }
    async remove(id, userId) {
        return this.prisma.listing.delete({
            where: { id },
        });
    }
};
exports.ListingsService = ListingsService;
exports.ListingsService = ListingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ListingsService);
//# sourceMappingURL=listings.service.js.map