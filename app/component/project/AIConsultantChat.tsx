'use client';

import { MessageType } from "@/app/_model/Message";
import { Button, Drawer, Form, Input, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import { MarkdownAdapter } from "../MarkdownAdapter";
import { Models } from "@/app/action/askAI";

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
                    <MarkdownAdapter
                        content={text}
                    />
                </div>
            </div>
        </div>
    )
}

type ModelSelectorProps = {
    model: Models;
    setModel: (model: Models) => void;
    models: Models[];
}

type AIAssistantChatProps = {
    messages: MessageType[];
    isOpen: boolean;
    onChatProject: (prompt: string) => void;
    isSendingMessage: boolean;
    onClose: () => void;
    model: Models;
    setModel: (model: Models) => void;
    models: Models[];
}

const ModelSelector = (props: ModelSelectorProps) => {
    const { model, setModel, models } = props;
    return (
        <div>
            <Form>
                <Form.Item label="Model">
                    <Select className="w-full" value={model}
                        onChange={(value) => {
                            setModel(value);
                        }}
                    >
                        {
                            models.map((model, index) => (
                                <Select.Option key={index} value={model}>{model}</Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}

export const AIAssistantChat = (
    props: AIAssistantChatProps
) => {
    const [currentMessage, setCurrentMessage] = useState<string>("");
    const { messages, onClose, isOpen, onChatProject, isSendingMessage, model, models, setModel } = props;

    return (
        <Drawer title="AI assistant" open={isOpen} onClose={onClose}>
            <div className="space-y-8 overflow-y-scroll h-full p-2">
                <div>
                    <ModelSelector
                        model={model}
                        models={models}
                        setModel={setModel}
                    />
                </div>
                {
                    messages.map((message, index) => (
                        <Message key={index} {...message} />
                    ))
                }
                <div className="space-y-4 flex flex-col items-center">
                    <Input.TextArea onChange={(value) => {
                        setCurrentMessage(value.target.value);
                    }} className="w-full rounded-xl" name="prompt" placeholder="What we do next?"></Input.TextArea>
                    <Button loading={isSendingMessage} onClick={() => { onChatProject(currentMessage) }} type="primary">send</Button>
                </div>
            </div>
        </Drawer>
    )

}