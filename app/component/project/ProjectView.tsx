
type ProjectViewProps = {
    projectId: string;
}

export const ProjectView = (
    props: ProjectViewProps
) => {
    return (
        <div className="space-y-5 border p-5">
            <h1>Project View</h1>
            <p>{props.projectId}</p>
            <div></div>
            <div></div>
        </div>
    );
}