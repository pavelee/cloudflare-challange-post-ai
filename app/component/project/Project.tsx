'use client';

import { API } from "@/app/util/api";
import { ProjectView } from "./ProjectView";
import { PromptForm } from "./PromptForm";
import { useEffect, useState } from "react";
import { AIAssistantChat } from "./AIConsultantChat";

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

export const Project = (
    props: ProjectProps
) => {
    const [project, setProject] = useState<any | null>(null);
    const [isAIConsultantChatOpen, setIsAIConsultantChatOpen] = useState(true);

    const onPromptProject = async (prompt: string) => {
        const code = await promptProject(props.projectId, prompt);
        if (!code) return;
        setProject(code);
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
        <div>Loading...</div>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <AIAssistantChat
                messages={project?.messages || []}
                isOpen={isAIConsultantChatOpen}
                onClose={() => setIsAIConsultantChatOpen(false)}
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