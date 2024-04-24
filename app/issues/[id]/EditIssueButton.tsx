import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <>
      <Button>
        <Link
          href={`/issues/edit/${issueId}`}
          className="flex items-center gap-2"
        >
          <span>
            <Pencil2Icon />
          </span>
          Edit Issue
        </Link>
      </Button>
    </>
  );
};

export default EditIssueButton;
