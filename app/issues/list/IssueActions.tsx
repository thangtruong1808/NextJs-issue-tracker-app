import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";

import { MdAdd } from "react-icons/md";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <>
      <Flex mb="5" justify="between">
        <IssueStatusFilter />
        <Button>
          {/* <GrNew /> */}
          <Link href={"/issues/new"}>New Issue</Link>
          <MdAdd size={20} />
        </Button>
      </Flex>
    </>
  );
};

export default IssueActions;
