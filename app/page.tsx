import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <>
      {/* <LatestIssues /> */}

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="3">
          <IssueSummary open={open} inProgress={in_progress} closed={closed} />
          <IssueChart open={open} inProgress={in_progress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
}
