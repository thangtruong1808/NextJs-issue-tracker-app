import { Button } from "@radix-ui/themes";
import Link from "next/link";

import { MdAdd } from "react-icons/md";

const IssueActions = () => {
  return (
    <>
      <div className="mb-5">
        <Button>
          {/* <GrNew /> */}
          <Link href={"/issues/new"}>New Issue</Link>
          <MdAdd size={20} />
        </Button>
      </div>
    </>
  );
};

export default IssueActions;
