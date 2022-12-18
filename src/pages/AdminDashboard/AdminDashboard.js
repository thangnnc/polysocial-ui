import { Helmet } from "react-helmet";
import { faker } from "@faker-js/faker";
// @mui
import { Grid, Container } from "@mui/material";
// sections
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
} from "../../sections/@dashboard/app";
import Title from "../../components/title";
import { useEffect, useState } from "react";
import Axios from "./../../utils/Axios/index";

// ----------------------------------------------------------------------

export default function AdminDashboard() {
  const [revenus, setRevenus] = useState({});
  const [accessTime, setAccessTime] = useState({});

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllData = async () => {
    const response = await Axios.Revenus.getAllRevenus();
    const responseAccessTime = await Axios.Revenus.getAllRevenuAccseeTime();
    setRevenus(response);
    setAccessTime({ people: responseAccessTime });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | Poly Social</title>
      </Helmet>

      <Container maxWidth="xl">
        <Title icon={"bxs:dashboard"}>Dashboard</Title>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số Nhóm Học Tập"
              total={revenus.totalGroup}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số Sinh Viên"
              total={revenus.totalStudent}
              color="info"
              bg="#d0f2ff"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số Giảng Viên"
              total={revenus.totalTeacher}
              color="warning"
              bg="#fff7cd"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Số Sinh Viên Hoạt Động"
              total={accessTime}
              color="error"
              bg="#ffe7d9"
              icon={"ant-design:bug-filled"}
            />
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
                  "1983, orders, $4220",
                  "12 Invoices have been paid",
                  "Order #37745 from September",
                  "New order placed #XF-2356",
                  "New order placed #XF-2346",
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
