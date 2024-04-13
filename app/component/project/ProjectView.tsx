'use client';

import { API } from "@/app/util/api";
import { use, useEffect, useState } from "react";

type ProjectViewProps = {
    projectId: string;
    code: string;
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    const { projectId, code } = props;

    return (
        <div className="space-y-5 border p-5">
            <h1 className="text-xl font-bold">Project View</h1>
            <p className="text-gray-500">{props.projectId}</p>
            <div
                className="border p-5"
                dangerouslySetInnerHTML={{ __html: code }}
            ></div>
            <pre className="border p-5 bg-gray-100">
                <code className="text-sm font-mono">{code}</code>
            </pre>
        </div>
    );
}