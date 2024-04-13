'use client';

import { useRouter } from "next/navigation";

export const Form = () => {
    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const prompt = form.elements.namedItem("prompt") as HTMLInputElement;
        const value = prompt.value;
        router.push(`/?pokemon=${value}`);
    }

    return (
        <form className="flex gap-4" onSubmit={onSubmit}>
            <textarea className="w-full border" name="prompt" placeholder="What are we building?" />
            <button type="submit">build</button>
        </form>
    );
}
