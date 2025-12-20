import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useGetCharacterByIdQuery, useUpdateCharacterMutation } from '../features/api/apiSlice';
import { useToast } from '../components/ui/ToastContext';

const characterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    ki: z.string().min(1, 'Ki is required'),
    race: z.string().min(2, 'Race is required'),
    gender: z.enum(['Male', 'Female', 'Unknown', 'Other']),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    affiliation: z.string().min(2, 'Affiliation is required'),
});

type CharacterFormValues = z.infer<typeof characterSchema>;

export function EditPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const { data: character, isLoading: isLoadingChar } = useGetCharacterByIdQuery(id!);
    const [updateCharacter, { isLoading: isUpdating }] = useUpdateCharacterMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CharacterFormValues>({
        resolver: zodResolver(characterSchema),
    });

    useEffect(() => {
        if (character) {
            setValue('name', character.name);
            setValue('ki', character.ki);
            setValue('race', character.race);
            setValue('gender', character.gender as any);
            setValue('description', character.description);
            setValue('affiliation', character.affiliation);
        }
    }, [character, setValue]);

    const onSubmit = async (data: CharacterFormValues) => {
        if (!character) return;

        try {
            await updateCharacter({
                ...character,
                ...data,
            }).unwrap();

            addToast('Character updated successfully!', 'success');
            navigate(`/character/${id}`);
        } catch (error) {
            addToast('Failed to update character', 'error');
        }
    };

    if (isLoadingChar) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link to={`/character/${id}`} className="inline-flex items-center text-gray-400 hover:text-yellow-500 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Details
            </Link>

            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
                <h1 className="text-3xl font-bold text-white mb-6">Edit Character</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Race</label>
                            <input
                                {...register('race')}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                            />
                            {errors.race && (
                                <p className="mt-1 text-sm text-red-500">{errors.race.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Ki</label>
                            <input
                                {...register('ki')}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                            />
                            {errors.ki && (
                                <p className="mt-1 text-sm text-red-500">{errors.ki.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="Male" className="bg-slate-700">Male</option>
                                <option value="Female" className="bg-slate-700">Female</option>
                                <option value="Unknown" className="bg-slate-700">Unknown</option>
                                <option value="Other" className="bg-slate-700">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Affiliation</label>
                        <input
                            {...register('affiliation')}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                        />
                        {errors.affiliation && (
                            <p className="mt-1 text-sm text-red-500">{errors.affiliation.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="flex items-center px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-yellow-500/20"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
