import { useRouter } from 'next/router';
import { Fragment } from 'react';

import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getAllEvents, getEventById } from '../../helpers/api-util';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return <div className='center'><p>loading...</p></div>
  }

  return (
    <div>
      <Fragment>
        <EventSummary title={event.title} />
        <EventLogistics
          date={event.date}
          address={event.location}
          image={event.image}
          imageAll={event.title}
        />
        <EventContent>
          <p>{event.description}</p>
        </EventContent>
      </Fragment>
    </div>
  )
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event
    },
    revalidate:30
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return{
    paths:paths,
    fallback:true
  }
}

export default EventDetailPage;