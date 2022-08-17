
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';

function Home() {
  const featuredEvents = getFeaturedEvents();


  return (
    <div>
      <EventList events={featuredEvents}/>
    </div>
  )
}

export default Home;