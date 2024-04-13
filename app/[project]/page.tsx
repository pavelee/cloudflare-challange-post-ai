import { ProjectView } from "../component/project/ProjectView";
import { PromptForm } from "../component/project/PromptForm";

type ProjectPageProps = {
    params: {
        project: string;
    }
}

const ProjectPage = async (props: ProjectPageProps) => {
    const { project } = props.params;

    return (
        <div className="flex flex-col ga-8 p-5">
            <h1>Project Page</h1>
            <PromptForm projectId={project} />
            <ProjectView projectId={project} />
        </div>
    );
}

export default ProjectPage;