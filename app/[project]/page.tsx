import { Project } from "../component/project/Project";

export const runtime = 'edge';

type ProjectPageProps = {
    params: {
        project: string;
    }
}

const ProjectPage = async (props: ProjectPageProps) => {
    const { project } = props.params;

    return (
        <div className="flex flex-col p-2">
            <Project projectId={project} />
        </div>
    );
}

export default ProjectPage;