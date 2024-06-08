import { Box, Card, CardContent, CardHeader } from "@mui/material";
import db from '@/db/db'
import { formatNumber, formatCurrency } from '@/lib/formatters'

async function getSalesData() {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  })

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  }
}

async function getUsersData() {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true
       }
    })
  ])

  return {
    userCount,
    averageValuePerUser: userCount === 0 ? 0 : (orderData._sum.pricePaidInCents || 0) / userCount / 100
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true }}),
    db.product.count({ where: { isAvailableForPurchase: false }}),
  ])

  return { activeCount, inactiveCount }
}


export default async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUsersData(),
    getProductData(),
  ]);

  return <Box>
    <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Orders`} content={formatCurrency(salesData.amount)} />
    <DashboardCard title="Customer" subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`} content={formatNumber(userData.userCount)} />
    <DashboardCard title="Active Products" subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} content={formatNumber(productData.activeCount)} />
  </Box>
}

export const DashboardCard = ({title, subtitle, content}: {title: string, subtitle: string, content: string}) => {
  return <Box>
  <Card>
    <CardHeader>
      {title}
    </CardHeader>
    <CardContent>
      {subtitle}
      {content}
    </CardContent>
  </Card>
</Box>
}