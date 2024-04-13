
type ProjectPageProps = {
    params: {
        project: string;
    }
}

const ProjectPage = (props: ProjectPageProps) => {
    const { project } = props.params;
    console.log(project);
    return (
        <div>
            <h1>Project Page</h1>
        </div>
    );
}

export default ProjectPage;