import { useCallback } from "react";
import { Button, Pagination } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const PaginationProduct = ({
    page,
    total,
    rowsPerPage,
    setPage,
}: {
    page: number;
    total: number;
    rowsPerPage: number;
    setPage: Function;
}) => {
    const router = useRouter();

    const onNextPage = () => {
        setPage(page + 1);
        router.push(`?page=${page + 1}&size=${rowsPerPage}`);
    };

    const onPreviousPage = () => {
        setPage(page - 1);
        router.push(`?page=${page - 1}&size=${rowsPerPage}`);
    };
    
    return (
        <>
            <Button

                isDisabled={page == 1}
                size="md"
                variant="flat"
                onPress={onPreviousPage}
            >
                Previous
            </Button>
            <Pagination
                className="text-white"
                isCompact
                showControls
                showShadow
                size="lg"
                color="primary"
                page={page}
                total={total}
                onChange={(p) => {
                    setPage(p)
                    router.push(`?page=${p}&size=${rowsPerPage}`)
                }}
            />
            <Button
                isDisabled={page == total}
                size="md"
                variant="flat"
                onPress={onNextPage}
            >
                Next
            </Button>
        </>
    );
};
