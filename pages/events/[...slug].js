import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEvents() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const fetcher = (url) => fetch(url).then(res => res.json())
  const { data, error } = useSWR('https://next-project-69cb8-default-rtdb.firebaseio.com/events.json',fetcher);

  useEffect(() => {
    if (data) {
      console.log(data)
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        })
      }

      setLoadedEvents(events);
    }
  }, [data])

  console.log(loadedEvents)
  if (!loadedEvents) {
    return (
      <Fragment>
        <p className='center'>Loading...</p>
      </Fragment>
    )
  }

  const filteredData = router.query.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>)
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });


  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  )
}

export default FilteredEvents;