'use client';

import { API } from "@/app/util/api";
import { Button, Drawer, Input, Switch } from "antd";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { MarkdownAdapter } from "../MarkdownAdapter";

type EditorProps = {
    content: string;
    setContent: (content: string) => void;
    saveProject: () => void;
    isSaving: boolean;
}

export const Editor = (
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

export const Preview = (
    props: PreviewProps
) => {
    const { content } = props;
    return (
        <MarkdownAdapter content={content} />
    )
}

type ProjectViewProps = {
    code: string;
    isSaving: boolean;
    saveProject: () => void;
    content: string;
    setContent: (content: string) => void;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    switchToPreviewAfterSave: boolean;
    setSwitchToPreviewAfterSave: (switchToPreviewAfterSave: boolean) => void;
    openAIConsultantChat: () => void;
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    const {
        code,
        isSaving,
        saveProject,
        content,
        setContent,
        isEdit,
        setIsEdit,
        switchToPreviewAfterSave,
        setSwitchToPreviewAfterSave,
        openAIConsultantChat
    } = props;

    const [haveAnyChanges, setHaveAnyChanges] = useState(false);

    useEffect(() => {
        setContent(code);
    }, [code, setContent]);

    useEffect(() => {
        setHaveAnyChanges(content != code);
    }, [content, code]);

    return (
        <div className="container mx-auto">
            <div className="space-y-4 flex gap-2">
                <div className="flex flex-col gap-4 w-1/6">
                    <div className="sticky top-0 flex flex-col gap-4 p-4">
                        <Button
                            type="default"
                            onClick={openAIConsultantChat}
                        >
                            AI Consultant 🚀
                        </Button>
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
                                    className={`${haveAnyChanges ? "animate-pulse" : ""}`}
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
}