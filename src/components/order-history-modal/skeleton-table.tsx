import {Box, Skeleton} from "@mui/material";
import React from "react";

export const SkeletonTable = () => {
    return <Box paddingTop={5}>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>
        <Skeleton variant="rectangular" width="100%" animation="wave" sx={{marginBottom: 0.2}}/>

    </Box>
}