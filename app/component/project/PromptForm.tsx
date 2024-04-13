
type PromptFormProps = {
    projectId: string;
    onPromptProject: (prompt: string) => void;
}

export const PromptForm = (props: PromptFormProps) => {

    const { projectId, onPromptProject } = props;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const prompt = form.elements.namedItem("sourceCode") as HTMLInputElement;
        const value = prompt.value;
        onPromptProject(value);
    }

    return (
        <form className="flex flex-col gap-4 justify-center" onSubmit={onSubmit}>
            <textarea
                name="sourceCode"
                placeholder="Whats next?"
                className="border w-full"
                rows={20}
                cols={20}
            />
            <button type="submit" className="m-auto border py-2 px-5">Go!</button>
        </form>
    )
}