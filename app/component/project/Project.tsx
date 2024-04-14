'use client';

import { API } from "@/app/util/api";
import { ProjectView } from "./ProjectView";
import { PromptForm } from "./PromptForm";
import { useEffect, useState } from "react";
import { AIAssistantChat } from "./AIConsultantChat";
import { FloatButton, Spin } from "antd";

type ProjectProps = {
    projectId: string;
}

const getProject = async (projectId: string) => {
    const project = await API.getProject({
        projectId
    });
    return project;
}

const getProjectCode = async (projectId: string) => {
    const project = await getProject(projectId);
    return project.sourceCode;
}

const promptProject = async (projectId: string, prompt: string) => {
    const code = await API.promptProject({
        projectId,
        prompt
    });
    return code.code;
}

const chatProject = async (projectId: string, prompt: string) => {
    return await API.chatProject(projectId, prompt);
}

export const Project = (
    props: ProjectProps
) => {
    const [project, setProject] = useState<any | null>(null);
    const [isAIConsultantChatOpen, setIsAIConsultantChatOpen] = useState(true);
    const [isSendingMessage, setIsSendingMessage] = useState(false);

    const openAIConsultantChat = () => {
        setIsAIConsultantChatOpen(true);
    }

    const closeAIConsultantChat = () => {
        setIsAIConsultantChatOpen(false);
    }

    const onPromptProject = async (prompt: string) => {
        const code = await promptProject(props.projectId, prompt);
        if (!code) return;
        setProject(code);
    }

    const onChatProject = async (prompt: string) => {
        setIsSendingMessage(true);
        const project = await chatProject(props.projectId, prompt);
        if (!project) return;
        setProject(project);
        setIsSendingMessage(false);
    }

    useEffect(() => {
        const fetchProject = async () => {
            const project = await getProject(props.projectId);
            if (!project) return;
            setProject(project);
        };

        fetchProject();
    }, [props.projectId]);

    if (!project) return (
        <Spin tip="loading your project.. 🧑‍💻">
            <div className="h-screen w-full"></div>
        </Spin>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <FloatButton.Group shape="circle" style={{ right: 24 }}>
                <FloatButton type="primary" onClick={openAIConsultantChat} />
            </FloatButton.Group>
            <AIAssistantChat
                messages={project?.messages || []}
                isOpen={isAIConsultantChatOpen}
                onClose={closeAIConsultantChat}
                onChatProject={onChatProject}
                isSendingMessage={isSendingMessage}
            />
            <PromptForm
                onPromptProject={onPromptProject}
            />
            <div className="grow">
                <ProjectView projectId={props.projectId}
                    code={project?.sourceCode || ""}
                />
            </div>
        </div>
    );
}