import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async create(createListingDto: CreateListingDto, userId: string) {
    return this.prisma.listing.create({
      data: {
        ...createListingDto,
        userId,
      },
    });
  }

  async findAll(query: any) {
    return this.prisma.listing.findMany({
      where: query,
      include: { images: true, user: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.listing.findUnique({
      where: { id },
      include: { images: true, user: true },
    });
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
