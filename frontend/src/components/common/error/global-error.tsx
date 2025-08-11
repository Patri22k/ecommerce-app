import Heading1 from "@/components/ui/heading1";
import {Frown} from "lucide-react";

interface GlobalErrorProps {
  name?: string;
  message?: string;
}

export default function GlobalError(props: GlobalErrorProps) {
  return (
    <div className={"w-full h-full min-h-screen flex flex-col items-center justify-center text-center"} aria-label={props.name} {...props}>
      <Heading1>An error occurred!</Heading1>
      <p>{props.message ?? "Error"}</p>
      <Frown className={"w-20 h-20 my-5"} />
    </div>
  );
}