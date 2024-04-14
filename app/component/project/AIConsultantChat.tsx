'use client';

import { MessageType } from "@/app/_model/Message";
import { Button, Drawer, Input } from "antd";
import Image from "next/image";
import { useState } from "react";
import Markdown from "react-markdown";

type AIAssistantChatProps = {
    messages: MessageType[];
    isOpen: boolean;
    onChatProject: (prompt: string) => void;
    isSendingMessage: boolean;
    onClose: () => void;
}

const SystemUser = () => {
    return (
        <div>
            <div className="flex items-center gap-2">
                <Image
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/300"
                    width={40}
                    height={40}
                    alt="AI Assistant"
                />
                <p className="font-bold">AI Assistant</p>
            </div>
        </div>
    )

}

const User = () => {
    return (
        <div>
            <div className="flex items-center gap-2">
                {/* <Image
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/300"
                    width={40}
                    height={40}
                    alt="User"
                /> */}
                <p className="font-bold">User</p>
            </div>
        </div>
    )
}

const Message = (props: MessageType) => {
    const { actor, text, date } = props;
    return (
        <div className="flex flex-col gap-2">
            {
                actor === "system" && <SystemUser />
            }
            {
                actor === "user" && <User />
            }
            <div className="space-y-1">
                <div className="text-small text-gray-400">{(new Date(date)).toLocaleString()}</div>
                <div className={`p-4 rounded-xl ${actor === "system" ? "bg-gray-100" : "bg-blue-100"}`}>
                    <Markdown>{text}</Markdown>
                </div>
            </div>
        </div>
    )
}

export const AIAssistantChat = (
    props: AIAssistantChatProps
) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const { messages, onClose, isOpen, onChatProject, isSendingMessage } = props;

    return (
        <Drawer title="AI assistant" open={isOpen} onClose={onClose}>
            <div className="space-y-8 overflow-y-scroll h-full p-2">
                {
                    messages.map((message, index) => (
                        <Message key={index} {...message} />
                    ))
                }
                <div className="space-y-4 flex flex-col items-center">
                    <Input.TextArea onChange={(value) => {
                        console.log(value.target.value);
                        setCurrentMessage(value.target.value);
                    }} className="w-full rounded-xl" name="prompt" placeholder="What we do next?"></Input.TextArea>
                    <Button loading={isSendingMessage} onClick={() => { onChatProject(currentMessage) }} type="primary">send</Button>
                </div>
            </div>
        </Drawer>
    )

}