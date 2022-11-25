import { Helmet } from 'react-helmet';
import { faker } from '@faker-js/faker';
// @mui
import { Grid, Container } from '@mui/material';
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
} from '../../sections/@dashboard/app';
import Title from '../../components/title';

// ----------------------------------------------------------------------

export default function AdminDashboard() {

  return (
    <>
      <Helmet>
        <title> Dashboard | Poly Social</title>
      </Helmet>

      <Container maxWidth="xl">
        <Title icon={'bxs:dashboard'}>
          Dashboard
        </Title>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số Bài Viết" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số Bình Luận" total={1352831} color="info" bg="#d0f2ff" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số Lượt Thích" total={1723315} color="warning" bg="#fff7cd" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng Số Thông Báo" total={234} color="error" bg="#ffe7d9" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(3)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/logo.png`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(3)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
