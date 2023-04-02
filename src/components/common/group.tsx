import { ReactNode } from "react";

export default function Group({ children }: { children?: ReactNode }) {
  return <div className="m-2 [&>*]:m-0 [&>*]:rounded-none">{children}</div>;
}
