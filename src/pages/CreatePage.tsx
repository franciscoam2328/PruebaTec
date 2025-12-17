import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useState } from 'react';

const characterSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    ki: z.string().min(1, 'Ki is required'),
    race: z.string().min(2, 'Race is required'),
    gender: z.enum(['Male', 'Female', 'Unknown', 'Other']),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    affiliation: z.string().min(2, 'Affiliation is required'),
});

type CharacterFormValues = z.infer<typeof characterSchema>;

export function CreatePage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CharacterFormValues>({
        resolver: zodResolver(characterSchema),
    });

    const onSubmit = async (data: CharacterFormValues) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Form submitted:', data);
        setIsSubmitting(false);
        // In a real app, we would redirect to the new character's detail page
        // For now, go back to home
        navigate('/');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Characters
            </Link>

            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Character</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                {...register('name')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Goku"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Race</label>
                            <input
                                {...register('race')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. Saiyan"
                            />
                            {errors.race && (
                                <p className="mt-1 text-sm text-red-500">{errors.race.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ki</label>
                            <input
                                {...register('ki')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                placeholder="e.g. 60.000.000"
                            />
                            {errors.ki && (
                                <p className="mt-1 text-sm text-red-500">{errors.ki.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                            <select
                                {...register('gender')}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unknown">Unknown</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && (
                                <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Affiliation</label>
                        <input
                            {...register('affiliation')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            placeholder="e.g. Z Fighter"
                        />
                        {errors.affiliation && (
                            <p className="mt-1 text-sm text-red-500">{errors.affiliation.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                            placeholder="Character description..."
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-orange-500/30"
                        >
                            {isSubmitting ? (
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
