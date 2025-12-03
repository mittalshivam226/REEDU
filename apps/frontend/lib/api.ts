import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Types based on Prisma schema
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface Listing {
  id: string;
  title: string;
  description?: string;
  price: number;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  location: string;
  tags: string[];
  edition?: string;
  isbn?: string;
  userId: string;
  user: User;
  images: Image[];
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  url: string;
  listingId: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
}

export interface CreateListingDto {
  title: string;
  description?: string;
  price: number;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  location: string;
  tags: string[];
  edition?: string;
  isbn?: string;
  images: string[];
}

// Auth APIs
export const authApi = {
  login: (data: LoginDto) => api.post<{ access_token: string; user: User }>('/auth/login', data),
  register: (data: RegisterDto) => api.post<{ access_token: string; user: User }>('/auth/register', data),
  profile: () => api.get<User>('/auth/profile'),
};

// Listings APIs
export const listingsApi = {
  getAll: (params?: { search?: string; condition?: string; minPrice?: number; maxPrice?: number }) =>
    api.get<Listing[]>('/listings', { params }),
  getById: (id: string) => api.get<Listing>(`/listings/${id}`),
  create: (data: CreateListingDto) => api.post<Listing>('/listings', data),
  update: (id: string, data: Partial<CreateListingDto>) => api.patch<Listing>(`/listings/${id}`, data),
  delete: (id: string) => api.delete(`/listings/${id}`),
  getUserListings: () => api.get<Listing[]>('/listings/user'),
};

// Users APIs
export const usersApi = {
  getProfile: () => api.get<User>('/users/profile'),
  updateProfile: (data: Partial<User>) => api.patch<User>('/users/profile', data),
};
