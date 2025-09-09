// pages/event/[slug].jsx
import React from 'react';
import { useRouter } from 'next/router'; // pages folder me useRouter
import EventDetail from '../../components/HomePage/Event/EventDetail';

export default function EventPage() {
  const router = useRouter();
  const { slug } = router.query; // dynamic slug

  // Optional: slug available hone ke baad render
  if (!slug) return <p>Loading...</p>;

  return (
    <div>
      {/* Component call */}
      <EventDetail slug={slug} />
    </div>
  );
}
