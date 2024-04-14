'use client';

import { API } from "@/app/util/api";
import { Button, Drawer, Input, Switch } from "antd";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { MarkdownAdapter } from "../MarkdownAdapter";
import { ProjectTitleGenerator } from "./ProjectTitleGenerator";
import { ProjectType } from "@/app/_model/Project";
import { ProjectTitleGeneratorModal } from "./ProjectTitleGeneratorModal";
import { ProjectCoverGeneratorModal } from "./ProjectCoverGeneratorModal";

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
    project: ProjectType;
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
        project,
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
            <div className="space-y-4 flex flex-col lg:flex-row gap-2">
                <div className="flex flex-col gap-4">
                    <div className="sticky top-0 flex flex-row lg:flex-col flex-wrap gap-4 p-4">
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
                        <Button
                            type="default"
                            onClick={openAIConsultantChat}
                        >
                            AI Chat 🚀
                        </Button>
                        <ProjectTitleGeneratorModal
                            title="AI Title Generator 🤖"
                            projectId={project.id}
                            content={content}
                        />
                        <ProjectCoverGeneratorModal
                            title="AI Cover Generator 🖼️"
                            projectId={project.id}
                            content={content}
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
                <div className="w-full lg:w-5/6">
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