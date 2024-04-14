'use client';

import { API } from "@/app/util/api";
import { Button, Drawer, Input, Switch } from "antd";
import Image from "next/image";
import { use, useEffect, useState } from "react";

type ProjectViewProps = {
    projectId: string;
    code: string;
}

type EditorProps = {
    content: string;
    setContent: (content: string) => void;
    saveProject: () => void;
}

const Editor = (
    props: EditorProps
) => {
    const { content, setContent, saveProject } = props;
    return (
        <div className="space-y-4">
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
    )
}

type PreviewProps = {
    content: string;
}

const Preview = (
    props: PreviewProps
) => {
    return (
        <div
            className="hover:outline hover:cursor-pointer"
            dangerouslySetInnerHTML={{ __html: props.content }}
        ></div>
    )
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    const { projectId, code } = props;
    const [content, setContent] = useState<string>(code);
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
            <div className="space-y-4">
                <div className="flex justify-center">
                    <Switch
                        checkedChildren="Edit"
                        unCheckedChildren="View"
                        defaultChecked={false}
                        onChange={(checked) => setIsEdit(checked)}
                    />
                </div>
                {
                    isEdit ? (
                        <Editor
                            content={content}
                            setContent={setContent}
                            saveProject={saveProject}
                        />
                    ) : (
                        <Preview content={content} />
                    )
                }
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