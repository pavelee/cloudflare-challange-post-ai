import { Button, Drawer, FloatButton, Input, Select } from "antd";
import Image from "next/image";
import { useState } from "react";

type PromptFormProps = {
    onPromptProject: (prompt: string) => void;
}

type AIAssistantChatProps = {
    isOpen: boolean,
    onPromptProject: (prompt: string) => void;
    onClose: () => void;
}

const AIAssistantChat = (
    props: AIAssistantChatProps
) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const { onPromptProject, onClose, isOpen } = props;

    return (
        <Drawer title="AI assistant" open={isOpen} onClose={onClose}>
            <div className="space-y-8 overflow-y-scroll h-full p-2">
                <div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                            <Image
                                className="w-10 h-10 rounded-full"
                                src="https://i.pravatar.cc/300"
                                width={40}
                                height={40}
                                alt="AI Assistant"
                            />
                            <p className="ml-3 font-bold">AI Assistant</p>
                        </div>
                        <div className="border p-4 rounded-xl">
                            Hey! What is the next step?
                        </div>
                    </div>
                </div>
                <div className="space-y-4 flex flex-col items-center">
                    <Select className="w-full" value="1">
                        <Select.Option value="1">Section 1</Select.Option>
                    </Select>
                    <Input.TextArea onChange={(value) => {
                        console.log(value.target.value);
                        setCurrentMessage(value.target.value);
                    }} className="w-full rounded-xl" name="prompt" placeholder="What we do next?"></Input.TextArea>
                    <Button onClick={() => { onPromptProject(currentMessage) }} type="primary">send</Button>
                </div>
            </div>
        </Drawer>
    )

}

export const PromptForm = (props: PromptFormProps) => {
    const [isBuilderChatOpen, setIsBuilderChatOpen] = useState<boolean>(false);

    const openBuilderChat = () => {
        setIsBuilderChatOpen(true);
    }

    const closeBuilderChat = () => {
        setIsBuilderChatOpen(false);
    }

    const { onPromptProject } = props;

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const prompt = form.elements.namedItem("sourceCode") as HTMLInputElement;
        const value = prompt.value;
        onPromptProject(value);
    }

    return (
        <div>
            <FloatButton.Group shape="circle" style={{ right: 24 }}>
                <FloatButton type="primary" onClick={openBuilderChat} />
            </FloatButton.Group>
            <AIAssistantChat onPromptProject={onPromptProject} onClose={closeBuilderChat} isOpen={isBuilderChatOpen} />
        </div>
    )

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