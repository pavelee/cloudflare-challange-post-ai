'use client';

import { API } from "@/app/util/api";
import { Button, Drawer, Input } from "antd";
import Image from "next/image";
import { use, useEffect, useState } from "react";

type ProjectViewProps = {
    projectId: string;
    code: string;
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    const { projectId, code } = props;
    const [content, setContent] = useState<string>(code);

    useEffect(() => {
        setContent(code);
    }, [code]);

    const saveProject = async () => {
        await API.saveProject(projectId, {
            sourceCode: content
        });
    }

    return (
        <div className="container mx-auto w-1/2">
            <div>
                <Button
                    type="primary"
                    onClick={saveProject}
                >
                    Save
                </Button>
                <Input.TextArea
                    value={content}
                    rows={100}
                    onChange={(e) => setContent(e.target.value)}
                >
                </Input.TextArea>
            </div>
        </div>
    )

    return (
        <div>
            <div
                className="hover:outline hover:cursor-pointer"
                dangerouslySetInnerHTML={{ __html: code }}
            ></div>
        </div>
    )

    return (
        <div className="space-y-5 border p-5 h-full">
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