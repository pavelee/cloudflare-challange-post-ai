'use client';

import { Button, Modal } from "antd"
import { ReactNode, useState } from "react";
import { ProjectCoverGenerator } from "./ProjectCoverGenerator";

type ProjectCoverGeneratorProps = {
    title: ReactNode;
    projectId: string;
    content: string;
}

export const ProjectCoverGeneratorModal = (
    props: ProjectCoverGeneratorProps
) => {
    const { title, projectId, content } = props;

    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <>
            <Modal
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <ProjectCoverGenerator
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