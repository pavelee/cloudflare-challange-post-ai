'use client';

import { MessageType } from "@/app/_model/Message";
import { Button, Drawer, Input } from "antd";
import Image from "next/image";
import { useState } from "react";

type AIAssistantChatProps = {
    messages: MessageType[];
    isOpen: boolean;
    onClose: () => void;
}

const Message = (props: MessageType) => {
    const { actor, text } = props;
    return (
        <div className="flex flex-col gap-4">
            {
                actor === "system" && (
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
                )
            }
            <div className={`p-4 rounded-xl ${actor === "system" ? "bg-gray-100" : "bg-blue-100"}`}>
                {text}
            </div>
        </div>
    )
}

export const AIAssistantChat = (
    props: AIAssistantChatProps
) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const { messages, onClose, isOpen } = props;

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
                    <Button onClick={() => { }} type="primary">send</Button>
                </div>
            </div>
        </Drawer>
    )

}