import { PromptForm } from "../component/project/PromptForm";

type ProjectPageProps = {
    params: {
        project: string;
    }
}

const ProjectPage = async (props: ProjectPageProps) => {
    const { project } = props.params;

    return (
        <div>
            <h1>Project Page</h1>
            <PromptForm projectId={project} />
        </div>
    );
}

export default ProjectPage;