// pages/event/[slug].jsx
import React from 'react';
import { useRouter } from 'next/router'; // pages folder me useRouter
import CoachDetail from '../../components/HomePage/Coach/CoachDetail';

export default function CoachPage() {
  const router = useRouter();
  const { slug } = router.query; // dynamic slug

  // Optional: slug available hone ke baad render
  if (!slug) return <p>Loading...</p>;

  return (
    <div>
      {/* Component call */}
      <CoachDetail slug={slug} />
    </div>
  );
}