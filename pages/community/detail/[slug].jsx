// pages/event/[slug].jsx
import React from 'react';
import { useRouter } from 'next/router'; // pages folder me useRouter
import CommunityDetail from '../../../components/Community/CommunityDetail';

export default function CommunityDetailPage() {
  const router = useRouter();
  const { slug } = router.query; // dynamic slug

  // Optional: slug available hone ke baad render
  if (!slug) return <p>Loading...</p>;

  return (
    <div>
      {/* Component call */}
      <CommunityDetail slug={slug} />
    </div>
  );
}
