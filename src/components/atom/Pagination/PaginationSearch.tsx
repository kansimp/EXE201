import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { getAllPostByPage, getAllPostBySearch } from '@redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '@redux/hook';

type PaginationSearchType = {
    search: string | null;
};
export default function PaginationSearch({ search }: PaginationSearchType) {
    const [page, setPage] = React.useState(1);
    const dispatch = useAppDispatch();
    const total_page = useAppSelector((state) => state.post.total_pages);
    useEffect(() => {
        dispatch(getAllPostBySearch({ page: page - 1, key: search }));
    }, [search]);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(getAllPostByPage(value - 1));
        setPage(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination count={total_page} page={page} onChange={handleChange} />
        </Stack>
    );
}
