import {ClientProps} from "@/hooks/use-admin-access";
import Heading1 from "@/components/ui/heading1";

interface ClientProfileProps {
  client: ClientProps;
}

export default function ClientProfile({client}: ClientProfileProps) {
  return (
    <>
      <span className={"w-full"}>
        {client.role === "ADMIN" && (
          <Heading1>You are currently logged in as Admin!</Heading1>
        )}
      </span>
      <span className={"w-full p-2 border rounded-xl bg-zinc-50"}><b className={"mr-2"}>Name:</b> {client.name}</span>
      <span className={"w-full p-2 border rounded-xl bg-zinc-50"}><b className={"mr-2"}>E-mail:</b> {client.email}</span>
    </>
  );
}