'use client';

import { useRouter } from "next/navigation";
import { API } from "../util/api";
import { Button, Result } from "antd";

export const Form = () => {
    const router = useRouter();

    const onCreateProject = async () => {
        const project = await API.createProject("my-project");
        router.push(`/${project.id}`);
    };

    return (
        <div className="flex flex-col bg-white p-8 lg:p-16 rounded-xl shadow-xl justify-center items-center gap-8">
            <h1 className="text-xl text-gray-500">
                Write a post ✍️ with assistance from AI 🤖
            </h1>
            <Button className="animate-pulse" onClick={onCreateProject} type="primary">create a project 🚂</Button>
        </div>
    );
}
