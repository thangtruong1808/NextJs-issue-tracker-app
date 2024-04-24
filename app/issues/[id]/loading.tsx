import { Skeleton } from "@/app/components";
import { Box, Button, Card, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";

const LoadingIssueDetailPage = () => {
  return (
    <>
      <Box className="max-w-xl">
        <Skeleton />
        <Flex className="space-x-3" my="2">
          <Skeleton width="5rem" />
          <Skeleton width="8rem" />
        </Flex>
        <Card className="prose " mt="4">
          <Skeleton count={3} />
        </Card>
        <Button mt="2" size="3">
          <Link href={"/issues"} className="flex items-center gap-1">
            <span>
              <IoIosArrowRoundBack size={30} />
            </span>
            Back
          </Link>
        </Button>
      </Box>
    </>
  );
};

export default LoadingIssueDetailPage;
