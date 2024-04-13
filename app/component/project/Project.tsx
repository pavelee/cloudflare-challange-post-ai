'use client';

import { API } from "@/app/util/api";
import { ProjectView } from "./ProjectView";
import { PromptForm } from "./PromptForm";
import { useEffect, useState } from "react";

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
    return project.code;
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

    const onPromptProject = async (prompt: string) => {
        const code = await promptProject(props.projectId, prompt);
        if (!code) return;
        setProject(code);
    }

    useEffect(() => {
        const fetchProject = async () => {
            const code = await getProjectCode(props.projectId);
            if (!code) return;
            setProject(code);
        };

        fetchProject();
    }, [props.projectId]);

    return (
        <div className="flex flex-col gap-8 p-5">
            <h1>Project</h1>
            <PromptForm projectId={props.projectId}
                onPromptProject={onPromptProject}
            />
            <ProjectView projectId={props.projectId}
                code={project}
            />
        </div>
    );
}