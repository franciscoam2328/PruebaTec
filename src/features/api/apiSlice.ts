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
    tagTypes: ['Character'],
    endpoints: (builder) => ({
        getCharacters: builder.query<CharactersResponse, number | void>({
            queryFn: async (page = 1, _queryApi, _extraOptions, fetchWithBQ) => {
                const result = await fetchWithBQ(`/characters?page=${page}&limit=10`);
                if (result.error) return { error: result.error as any };

                const apiData = result.data as CharactersResponse;

                // Filter out deleted IDs
                const deletedIds = JSON.parse(localStorage.getItem('db_deleted_ids') || '[]');
                apiData.items = apiData.items.filter(item => !deletedIds.includes(item.id));

                const localChars = JSON.parse(localStorage.getItem('db_local_characters') || '[]');

                if (page === 1) {
                    return {
                        data: {
                            ...apiData,
                            items: [...localChars, ...apiData.items],
                            meta: {
                                ...apiData.meta,
                                totalItems: apiData.meta.totalItems + localChars.length
                            }
                        }
                    };
                }

                return { data: apiData };
            },
            providesTags: ['Character'],
        }),
        getCharacterById: builder.query<Character, string>({
            queryFn: async (id, _queryApi, _extraOptions, fetchWithBQ) => {
                const localChars = JSON.parse(localStorage.getItem('db_local_characters') || '[]');
                const localChar = localChars.find((c: Character) => c.id.toString() === id);

                if (localChar) {
                    return { data: localChar };
                }

                const result = await fetchWithBQ(`/characters/${id}`);
                return result.data ? { data: result.data as Character } : { error: result.error as any };
            },
            providesTags: (_result, _error, id) => [{ type: 'Character', id }],
        }),
        createCharacter: builder.mutation<Character, Partial<Character>>({
            queryFn: async (newChar) => {
                await new Promise(resolve => setTimeout(resolve, 500));

                const localChars = JSON.parse(localStorage.getItem('db_local_characters') || '[]');
                const createdChar = {
                    ...newChar,
                    id: Date.now(),
                    image: 'https://web.dragonball-api.com/images-static/dragon-ball-z-logo.png',
                    deletedAt: null
                } as Character;

                localStorage.setItem('db_local_characters', JSON.stringify([createdChar, ...localChars]));

                return { data: createdChar };
            },
            invalidatesTags: ['Character'],
        }),
        updateCharacter: builder.mutation<Character, Character>({
            queryFn: async (updatedChar) => {
                await new Promise(resolve => setTimeout(resolve, 500));

                const localChars = JSON.parse(localStorage.getItem('db_local_characters') || '[]');
                const index = localChars.findIndex((c: Character) => c.id === updatedChar.id);

                if (index !== -1) {
                    localChars[index] = updatedChar;
                    localStorage.setItem('db_local_characters', JSON.stringify(localChars));
                    return { data: updatedChar };
                }

                const clonedChar = { ...updatedChar };
                localStorage.setItem('db_local_characters', JSON.stringify([clonedChar, ...localChars]));

                return { data: clonedChar };
            },
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Character', id }, 'Character'],
        }),
        deleteCharacter: builder.mutation<{ success: boolean; id: number }, number>({
            queryFn: async (id) => {
                await new Promise(resolve => setTimeout(resolve, 500));

                const localChars = JSON.parse(localStorage.getItem('db_local_characters') || '[]');
                const filteredChars = localChars.filter((c: Character) => c.id !== id);

                if (localChars.length !== filteredChars.length) {
                    localStorage.setItem('db_local_characters', JSON.stringify(filteredChars));
                    return { data: { success: true, id } };
                }

                const deletedIds = JSON.parse(localStorage.getItem('db_deleted_ids') || '[]');
                localStorage.setItem('db_deleted_ids', JSON.stringify([...deletedIds, id]));

                return { data: { success: true, id } };
            },
            invalidatesTags: ['Character'],
        }),
    }),
});

export const {
    useGetCharactersQuery,
    useGetCharacterByIdQuery,
    useCreateCharacterMutation,
    useUpdateCharacterMutation,
    useDeleteCharacterMutation
} = apiSlice;
