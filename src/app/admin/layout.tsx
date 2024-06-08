import { AppBar, Box } from "@mui/material"
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>
    <AppBar
      position="sticky"
    >
      <Link href='/admin'>Dashboard</Link>
      <Link href='/admin/products'>Products</Link>
      <Link href='/admin/users'>Customers</Link>
      <Link href='/admin/orders'>Sales</Link>
    </AppBar>
    <Box>
      {children}
    </Box>
  </>
}