// pages/event/[slug].jsx
import React from 'react';
import { useRouter } from 'next/router'; // pages folder me useRouter
import StoryDetail from '../../components/HomePage/Story/StoryDetail';

export default function StoryPage() {
  const router = useRouter();
  const { slug } = router.query; // dynamic slug

  // Optional: slug available hone ke baad render
  if (!slug) return <p>Loading...</p>;

  return (
    <div>
      {/* Component call */}
      <StoryDetail slug={slug} />
    </div>
  );
}