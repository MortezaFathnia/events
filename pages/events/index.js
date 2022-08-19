
import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

import { Fragment } from 'react';
import { useRouter } from 'next/router';

function AllEventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </Fragment>
  )
}
export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events
    },
    revalidate:60
  }
}
export default AllEventsPage