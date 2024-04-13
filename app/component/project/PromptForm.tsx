
type PromptFormProps = {
    projectId: string;
}

export const PromptForm = (props: PromptFormProps) => {
    return (
        <form className="flex flex-col gap-4 justify-center">
            <textarea
                name="sourceCode"
                placeholder="Whats next?"
                className="border w-full"
                rows={20}
                cols={20}
            />
            <button className="m-auto border py-2 px-5">Go!</button>
        </form>
    )
}