import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useCreateCharacterMutation } from '../features/api/apiSlice';
import { useToast } from '../components/ui/ToastContext';

const characterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    ki: z.string().min(1, 'Ki is required'),
    race: z.string().min(2, 'Race is required'),
    gender: z.enum(['Male', 'Female', 'Unknown', 'Other']),
    image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    affiliation: z.string().min(2, 'Affiliation is required'),
});

type CharacterFormValues = z.infer<typeof characterSchema>;

export function CreatePage() {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [createCharacter, { isLoading }] = useCreateCharacterMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CharacterFormValues>({
        resolver: zodResolver(characterSchema),
    });

    const onSubmit = async (data: CharacterFormValues) => {
        try {
            // If image is empty string, make it undefined so the API fallback works
            const payload = {
                ...data,
                image: data.image || undefined
            };

            await createCharacter(payload).unwrap();
            addToast('Character created successfully!', 'success');
            navigate('/');
        } catch (error) {
            console.error('Failed to create character:', error);
            addToast('Failed to create character. Please try again.', 'error');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-400 hover:text-yellow-500 mb-6 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Characters
            </Link>

            <div className="bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-700">
                <h1 className="text-3xl font-bold text-white mb-6">Create New Character</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Image URL Field - Full Width */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                        <input
                            {...register('image')}
                            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">Leave empty to use the default Dragon Ball logo.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all placeholder-gray-500"
                                placeholder="e.g. Goku"
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
                                placeholder="e.g. Saiyan"
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
                                placeholder="e.g. 60.000.000"
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
                                <option value="" className="bg-slate-700">Select gender</option>
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
                            placeholder="e.g. Z Fighter"
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
                            placeholder="Character description..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-yellow-500/20"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    Create Character
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
