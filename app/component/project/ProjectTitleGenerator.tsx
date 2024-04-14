'use client';

import { API } from "@/app/util/api";
import { Alert, Button, Form, Input, Modal } from "antd"
import { ReactNode, useState } from "react";

type ProjectTitleGeneratorProps = {
    title: ReactNode;
    projectId: string;
    content: string;
}

export const ProjectTitleGenerator = (
    props: ProjectTitleGeneratorProps
) => {
    const { projectId, content } = props;
    const [summary, setSummary] = useState<string>("");
    const [generatedTitle, setGeneratedTitle] = useState<string>("");
    const [context, setContext] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSummarize = async () => {
        setIsLoading(true);
        const summary = await API.summaryContent({
            projectID: projectId,
            content: content
        });
        setSummary(summary.summary);
        setIsLoading(false);
    }

    const onTitleGenerate = async () => {
        setIsLoading(true);
        const title = await API.generateProjectTitle(projectId, content, context);
        setGeneratedTitle(title);
        setIsLoading(false);
        return title;
    }

    const { title } = props;
    return (
        <div className="p-5 space-y-4">
            <Alert message="Title is generated based on summary of the text" type="info" showIcon />
            <Form>
                <Form.Item>
                    <Input.TextArea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="(optional) What title suppose to be? More spicy, more attractive?"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item className="flex justify-center">
                    <Button loading={isLoading} onClick={onTitleGenerate}>
                        generate
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <h1 className="text-xl font-bold">{generatedTitle}</h1>
            </div>
        </div>
    )
}