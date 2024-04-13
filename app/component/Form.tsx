'use client';

import { useRouter } from "next/navigation";
import { API } from "../util/api";
import { Button, FloatButton, Input, Result } from "antd";

export const Form = () => {
    const router = useRouter();

    // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const form = e.currentTarget;
    //     const prompt = form.elements.namedItem("prompt") as HTMLInputElement;
    //     const value = prompt.value;
    //     router.push(`/?pokemon=${value}`);
    // };

    const onCreateProject = async () => {
        const project = await API.createProject("my-project");
        router.push(`/${project.id}`);
    };

    return (
        <div className="w-full h-screen flex flex-col">
            <Result
                title="Let's create a project!"
                extra={<Button onClick={onCreateProject} type="primary">create a project</Button>}
            />
            {/* <form className="flex flex-col gap-8" onSubmit={onSubmit}>
                <Input.TextArea className="w-full rounded-xl" name="prompt" placeholder="What are we building?"></Input.TextArea>
                <Button className="m-auto" htmlType="submit" type="primary" onClick={onCreateProject}>create project</Button>
            </form>
            <FloatButton onClick={() => console.log('onClick')} /> */}
        </div>
    );
}
