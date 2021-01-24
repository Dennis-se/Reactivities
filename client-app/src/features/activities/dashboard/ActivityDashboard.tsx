import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadActivities, loadingInitial} = rootStore.activityStore;

  useEffect(() => {
    loadActivities();
  }, [loadActivities]); // [] Ensure that useEffect runs one time only and not continously. useEffect runs every time it renders,
  // ie when loadActivities is called then useEffect is called again. So it prevents an infinity loop.
  // [activityStore] is specified as dependency.

  if (loadingInitial)
    return <LoadingComponent content="Loading activities..." />;

      return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>

      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
