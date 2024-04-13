'use client';

import { API } from "@/app/util/api";
import { use, useEffect, useState } from "react";

type ProjectViewProps = {
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

export const ProjectView = (
    props: ProjectViewProps
) => {
    const [project, setProject] = useState<any | null>(null);

    useEffect(() => {
        console.log(props.projectId);
        const fetchProject = async () => {
            const code = await getProjectCode(props.projectId);
            setProject(code);
        };

        fetchProject();
    }, [props.projectId]);


    return (
        <div className="space-y-5 border p-5">
            <h1 className="text-xl font-bold">Project View</h1>
            <p className="text-gray-500">{props.projectId}</p>
            <div
                className="border p-5"
                dangerouslySetInnerHTML={{ __html: project }}
            ></div>
            <pre className="border p-5 bg-gray-100">
                <code className="text-sm font-mono">{project}</code>
            </pre>
        </div>
    );
}