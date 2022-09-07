import { gql, useMutation } from "@apollo/client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { CURRENT_USER_QUERY, useUser } from "../hooks/user";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const { data } = useSession();
  console.log(data);

  const user = useUser();
  console.log(user);

  const [signOutGQ] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const endSession = async () => {
    await signOutGQ();
    await signOut();
  };

  return (
    <Button
      className="p-button-sm p-button-text p-button-secondary"
      icon="pi pi-power-off"
      label={data?.user.name}
      onClick={endSession}
      title="LOGOUT"
    />
  );
}
