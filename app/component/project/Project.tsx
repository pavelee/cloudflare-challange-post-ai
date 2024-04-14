'use client';

import { API } from "@/app/util/api";
import { ProjectView } from "./ProjectView";
import { PromptForm } from "./PromptForm";
import { useEffect, useState } from "react";
import { AIAssistantChat } from "./AIConsultantChat";
import { Spin } from "antd";
import { Models, availableModels, defaultModel } from "@/app/action/askAI";
import { ProjectType } from "@/app/_model/Project";

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

const chatProject = async (projectId: string, prompt: string, model?: Models) => {
    return await API.chatProject(projectId, prompt, model);
}

export const Project = (
    props: ProjectProps
) => {
    const { projectId } = props;
    const [project, setProject] = useState<ProjectType | null>(null);
    const [isAIConsultantChatOpen, setIsAIConsultantChatOpen] = useState(true);
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [content, setContent] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [switchToPreviewAfterSave, setSwitchToPreviewAfterSave] = useState(true);
    const [model, setModel] = useState<Models | null>(null);
    const [models, setModels] = useState<Models[]>(availableModels);

    const openAIConsultantChat = () => {
        setIsAIConsultantChatOpen(true);
    }

    const closeAIConsultantChat = () => {
        setIsAIConsultantChatOpen(false);
    }

    // const onPromptProject = async (prompt: string) => {
    //     const code = await promptProject(props.projectId, prompt);
    //     if (!code) return;
    //     setProject(code);
    // }

    const onChatProject = async (prompt: string) => {
        setIsSendingMessage(true);
        const project = await chatProject(props.projectId, prompt, model ? model : undefined);
        if (!project) return;
        setProject(project);
        setIsSendingMessage(false);
    }

    const saveProject = async () => {
        setIsSaving(true);
        await API.saveProject(projectId, {
            content: content
        });
        const project = await getProject(projectId);
        setProject(project);
        if (switchToPreviewAfterSave) {
            setIsEdit(false);
        }
        setIsSaving(false);
    }

    const changeChatModel = async (model: Models) => {
        setModel(model);
        await API.saveProject(projectId, {
            chatModel: model
        });
    }

    useEffect(() => {
        const fetchProject = async () => {
            const project = await getProject(props.projectId);
            if (!project) return;
            setProject(project);
        };

        fetchProject();
    }, [props.projectId]);

    useEffect(() => {
        if (project) {
            console.log(project.models.chatModel);
            setModel(project.models.chatModel);
        }
    }, [project])

    if (!project || !model) return (
        <Spin tip="loading your project.. 🧑‍💻">
            <div className="h-screen w-full"></div>
        </Spin>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <AIAssistantChat
                messages={project?.messages || []}
                isOpen={isAIConsultantChatOpen}
                onClose={closeAIConsultantChat}
                onChatProject={onChatProject}
                isSendingMessage={isSendingMessage}
                models={models}
                model={model}
                setModel={changeChatModel}
            />
            {/* <PromptForm
                onPromptProject={onPromptProject}
            /> */}
            <div className="grow">
                <ProjectView
                    code={project?.sourceCode || ""}
                    isSaving={isSaving}
                    saveProject={saveProject}
                    content={content}
                    setContent={setContent}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    switchToPreviewAfterSave={switchToPreviewAfterSave}
                    setSwitchToPreviewAfterSave={setSwitchToPreviewAfterSave}
                    openAIConsultantChat={openAIConsultantChat}
                />
            </div>
        </div>
    );
}