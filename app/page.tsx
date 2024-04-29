import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

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

export const metadata: Metadata = {
  title: "Bug Tracker - Dashboard",
  description: "View a Summary of project bugs",
};
