// pages/event/[slug].jsx
import React from 'react';
import { useRouter } from 'next/router'; // pages folder me useRouter
import CommunityListing from '../../components/Community/CommunityListing';

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query; // dynamic slug

  // Optional: slug available hone ke baad render
  if (!slug) return <p>Loading...</p>;

  return (
    <div>
      {/* Component call */}
      <CommunityListing slug={slug} />
    </div>
  );
}
