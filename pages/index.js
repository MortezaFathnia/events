
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

function Home(props) {
  const featuredEvents = getFeaturedEvents();


  return (
    <div>
      <EventList events={props.events}/>
    </div>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents
    },
    revalidate:1800
  }
}
export default Home;