'use client';

import { API } from "@/app/util/api";
import { Button, Drawer, Input, Switch } from "antd";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { MarkdownAdapter } from "../MarkdownAdapter";

type ProjectViewProps = {
    projectId: string;
    code: string;
}

type EditorProps = {
    content: string;
    setContent: (content: string) => void;
    saveProject: () => void;
    isSaving: boolean;
}

const Editor = (
    props: EditorProps
) => {
    const { content, setContent, saveProject, isSaving } = props;
    return (
        <div className="space-y-4">
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
    const { content } = props;
    return (
        <MarkdownAdapter content={content} />
    )
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    const { projectId, code } = props;
    const [content, setContent] = useState<string>(code);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [switchToPreviewAfterSave, setSwitchToPreviewAfterSave] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    useEffect(() => {
        setContent(code);
    }, [code]);

    const saveProject = async () => {
        setIsSaving(true);
        await API.saveProject(projectId, {
            sourceCode: content
        });
        if (switchToPreviewAfterSave) {
            setIsEdit(false);
        }
        setIsSaving(false);
    }

    return (
        <div className="container mx-auto">
            <div className="space-y-4 flex gap-2">
                <div className="flex flex-col gap-4 w-1/6">
                    <div className="sticky top-0 flex flex-col gap-4 p-4">
                        <Switch
                            checkedChildren="Edit"
                            unCheckedChildren="View"
                            defaultChecked={false}
                            value={isEdit}
                            onChange={(checked) => setIsEdit(checked)}
                        />
                        <Switch
                            checkedChildren="Switch to view after save"
                            unCheckedChildren="Stay in edit mode after save"
                            defaultChecked={true}
                            value={switchToPreviewAfterSave}
                            onChange={(checked) => setSwitchToPreviewAfterSave(checked)}
                        />
                        {
                            isEdit && (
                                <Button
                                    loading={isSaving}
                                    type="default"
                                    onClick={saveProject}
                                >
                                    Save
                                </Button>
                            )
                        }
                    </div>
                </div>
                <div className="w-5/6">
                    {
                        isEdit ? (
                            <Editor
                                content={content}
                                setContent={setContent}
                                saveProject={saveProject}
                                isSaving={isSaving}
                            />
                        ) : (
                            <Preview content={content} />
                        )
                    }
                </div>
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