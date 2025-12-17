import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Character {
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    deletedAt: null | string;
}

export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface CharactersResponse {
    items: Character[];
    meta: Meta;
    links: Links;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dragonball-api.com/api' }),
    endpoints: (builder) => ({
        getCharacters: builder.query<CharactersResponse, number | void>({
            query: (page = 1) => `/characters?page=${page}&limit=10`,
        }),
        getCharacterById: builder.query<Character, string>({
            query: (id) => `/characters/${id}`,
        }),
    }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
