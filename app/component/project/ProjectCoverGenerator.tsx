import { Models, defaultImageModel, imageGenerationModels } from "@/app/action/askAI";
import { API } from "@/app/util/api";
import { Alert, Button, Form, Input, Select } from "antd";
import Image from "next/image";
import { ReactNode, useState } from "react";

type ProjectCoverGeneratorProps = {
    title: ReactNode;
    projectId: string;
    content: string;
}


export const ProjectCoverGenerator = (props: ProjectCoverGeneratorProps) => {
    const { projectId, content } = props;
    const [context, setContext] = useState<string>("");
    const [imageURL, setImageURL] = useState<string>("");
    const [model, setModel] = useState<Models>(defaultImageModel);
    const [models, setModels] = useState<Models[]>(imageGenerationModels);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onCoverGenerator = async () => {
        setIsLoading(true);
        const url = await API.generateProjectCover(projectId, content, context, model);
        setImageURL(url);
        setIsLoading(false);
        return title;
    }

    const { title } = props;
    return (
        <div className="p-5 space-y-4">
            <Alert message="Cover is generated based on summary of the text" type="info" showIcon />
            <Form>
                <Form.Item>
                    <Select
                        value={model}
                        onChange={(value) => setModel(value)}
                        placeholder="Select model"
                    >
                        {
                            models.map((model) => (
                                <Select.Option value={model} key={model}>
                                    {model}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input.TextArea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="(optional) What title suppose to be? More spicy, more attractive?"
                    ></Input.TextArea>
                </Form.Item>
                <Form.Item className="flex justify-center">
                    <Button loading={isLoading} onClick={onCoverGenerator}>
                        generate
                    </Button>
                </Form.Item>
            </Form>
            <div>
                {
                    imageURL && (
                        <Image src={imageURL} width={600} height={800} alt={'asdas'} />
                    )
                }
            </div>
        </div>
    )
}