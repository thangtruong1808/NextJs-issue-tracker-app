import authOptions from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import AssigneeSelect from "./AssigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  //   if (typeof params.id !== "number") {
  //     notFound();
  //   }
  const session = await getServerSession(authOptions);
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetails issue={issue} />
        </Box>

        {session && (
          <Box>
            <Flex direction="column" gap="4">
              <AssigneeSelect issue={issue} />
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        )}
      </Grid>

      <Button mt="5">
        <Link href={"/issues/list"} className="flex items-center gap-1">
          <span>
            <IoIosArrowRoundBack size={30} />
          </span>
          Back
        </Link>
      </Button>
    </>
  );
};

export default IssueDetailPage;
