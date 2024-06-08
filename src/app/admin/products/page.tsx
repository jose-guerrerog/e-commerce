import { PageHeader } from "../_components/PageHeader";
import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function AdminProductsPage () {
  return <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
    <PageHeader>Products</PageHeader>
    <Button variant="contained"><Link href='/admin/products/new'>Add Product</Link></Button>
  </Box>
}