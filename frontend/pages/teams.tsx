import { gql, useQuery } from "@apollo/client";
import { Paper } from "@mui/material";
import { NextPage } from "next";
import client from "../apollo/client";
import { ALL_PROJECTS_QUERY } from "./projects";

export const ALL_TEAMS_QUERY = gql`
  query ALL_TEAMS_QUERY {
    teams {
      name
      id
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_TEAMS_QUERY,
  });

  return {
    props: {
      teams: data.teams,
    },
  };
}

const Teams: NextPage = ({ teams }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <h1>THIS IS THE TEAMS PAGE</h1>
      <ul>
        {teams.map((team) => (
          <li key={`team-${team.id}`}>{team.name}</li>
        ))}
      </ul>
    </Paper>
  );
};

export default Teams;
