import { gql } from "@apollo/client";
import { Paper } from "@mui/material";
import client from "../../apollo/client";

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_PROJECTS_QUERY,
  });

  return {
    props: {
      projects: data.projects,
    },
  };
}

export const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
    projects {
      name
      id
    }
  }
`;

export default function Projects({ projects }) {
  return (
    <Paper sx={{ p: 2 }}>
      <h1>THIS IS THE PROJECTS PAGE</h1>
      <ul>
        {projects.map((project) => (
          <li key={`team-${project.id}`}>{project.name}</li>
        ))}
      </ul>
    </Paper>
  );
}
