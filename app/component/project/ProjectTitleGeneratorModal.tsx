'use client';

import { Button, Modal } from "antd"
import { ReactNode, useState } from "react";
import { ProjectTitleGenerator } from "./ProjectTitleGenerator";

type ProjectTitleGeneratorProps = {
    title: ReactNode;
    projectId: string;
    content: string;
}

export const ProjectTitleGeneratorModal = (
    props: ProjectTitleGeneratorProps
) => {
    const { title, projectId, content } = props;

    const [isModalVisible, setIsModalVisible] = useState(true);
    return (
        <>
            <Modal
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <ProjectTitleGenerator
                    title={title}
                    projectId={projectId}
                    content={content}
                />
            </Modal>
            <Button onClick={() => setIsModalVisible(true)}>
                {title}
            </Button>
        </>
    )
}