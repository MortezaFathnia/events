
import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

import { Fragment } from 'react';
import {useRouter} from 'next/router';

function AllEventsPage() {
  const router=useRouter();
  const events = getAllEvents();

  function findEventsHandler(year,month){
    const fullPath=`/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler}/>
      <EventList events={events} />
    </Fragment>
  )
}

export default AllEventsPage