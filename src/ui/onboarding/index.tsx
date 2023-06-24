"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { toast } from 'sonner';
import useLocalStorage from '@/src/app/lib/hooks/use-local-storage';
import { redirect } from 'next/navigation';


type FormData = {
    name: string;
    age: string;
    gender: string;
    journalReasons: Record<string, boolean>;
};

const ageOptions = ['Under 18', '18-24', '25-38', '38+'];
const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const journalReasonOptions = ['Stress Relief', 'Creativity', 'Memory', 'Self-discipline'];

const OnboardingForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<FormData>();
    const [editStep, setEditStep] = useState<number>(0);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const name = watch('name');
    const age = watch('age');
    const gender = watch('gender');
    const journalReasons = getValues('journalReasons');



    const debouncedInputChange = debounce((field: keyof FormData, value: string | Record<string, boolean>) => {
        setValue(field, value);
        setEditStep((prevStep) => prevStep + 1);
    }, 500);

    const onSubmit = (data: FormData) => {
        const selectedReasons = Object.keys(data.journalReasons).filter((reason) => data.journalReasons[reason]);
        console.log({ ...data, journalReasons: selectedReasons });
        setIsSubmitted(true);
        localStorage.setItem('userData', JSON.stringify({ ...data, journalReasons: selectedReasons }));
        toast.success('Onboarding completed!');
        redirect('/')
    };

    const handleEditStep = (step: number) => {
        setEditStep(step);
    };

    const preventSubmit = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') event.preventDefault();
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white p-8 shadow-md rounded-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <p className="mb-4">Hi! What's your name?</p>
                        {editStep === 0 ? (
                            <div>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    {...register('name', { required: 'Name is required' })}
                                    onChange={(e) => debouncedInputChange('name', e.target.value)}
                                    onKeyPress={preventSubmit}
                                />
                                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                            </div>
                        ) : (
                            <p
                                className="mb-4 text-blue-600 cursor-pointer"
                                onClick={() => handleEditStep(0)}
                            >
                                Hi, {name}
                            </p>
                        )}
                    </div>

                    {name && (
                        <div>
                            <p className="mb-4">How old are you?</p>
                            {editStep === 1 ? (
                                <div>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md"
                                        {...register('age', { required: 'Age is required' })}
                                        onChange={(e) => debouncedInputChange('age', e.target.value)}
                                    >
                                        <option value="">Select Age</option>
                                        {ageOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.age && <p className="text-red-500">{errors.age.message}</p>}
                                </div>
                            ) : (
                                <p
                                    className="mb-4 text-blue-600 cursor-pointer"
                                    onClick={() => handleEditStep(1)}
                                >
                                    Age: {age}
                                </p>
                            )}
                        </div>
                    )}

                    {age && (
                        <div>
                            <p className="mb-4">What's your gender?</p>
                            {editStep === 2 ? (
                                <div>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md"
                                        {...register('gender', { required: 'Gender is required' })}
                                        onChange={(e) => debouncedInputChange('gender', e.target.value)}
                                    >
                                        <option value="">Select Gender</option>
                                        {genderOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
                                </div>
                            ) : (
                                <p
                                    className="mb-4 text-blue-600 cursor-pointer"
                                    onClick={() => handleEditStep(2)}
                                >
                                    Gender: {gender}
                                </p>
                            )}
                        </div>
                    )}

                    {gender && (
                        <div>
                            <p className="mb-4">
                                Why do you want to journal? (You can select multiple options)
                            </p>
                            {editStep >= 3 ? (
                                <div>
                                    {journalReasonOptions.map((option) => (
                                        <label className="block" key={option}>
                                            <input
                                                type="checkbox"
                                                {...register(`journalReasons.${option}`)}
                                                onChange={(e) =>
                                                    debouncedInputChange('journalReasons', {
                                                        ...journalReasons,
                                                        [option]: e.target.checked,
                                                    })
                                                }
                                            />
                                            <span className="ml-2">{option}</span>
                                        </label>
                                    ))}
                                    {/* {errors.journalReasons && (
                                        <p className="text-red-500">{errors.journalReasons.message}</p>
                                    )} */}
                                </div>
                            ) : (
                                <div
                                    className="mb-4 text-blue-600 cursor-pointer"
                                    onClick={() => handleEditStep(3)}
                                >
                                    Reasons: {Object.keys(journalReasons).filter((reason) => journalReasons[reason]).join(', ')}
                                </div>
                            )}
                        </div>
                    )}

                    {journalReasons && (
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            type="submit"
                        >
                            Let's begin journaling
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default OnboardingForm;
