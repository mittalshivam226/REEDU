import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, userId: string) {
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

  async findAll(query: any) {
    const listings = await this.prisma.listing.findMany({
      where: query,
      include: { images: true, user: true },
    });
    return listings.map(listing => ({
      ...listing,
      tags: JSON.parse(listing.tags || '[]'),
    }));
  }

  async findOne(id: string) {
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

  async update(id: string, updateListingDto: any, userId: string) {
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async remove(id: string, userId: string) {
    return this.prisma.listing.delete({
      where: { id },
    });
  }
}
