import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect } from 'react';
import { getAllPostByPage } from '@redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '@redux/hook';

export default function PaginationControlled() {
    const [page, setPage] = React.useState(1);
    const dispatch = useAppDispatch();
    const total_page = useAppSelector((state) => state.post.total_pages);
    useEffect(() => {
        dispatch(getAllPostByPage(page - 1));
    }, []);
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
