// Removed: "use client"; 

import React from 'react';
import { getProfile } from '../../../atproto/getProfile'; // Adjusted path
import { AppBskyActorDefs } from '@atproto/api'; // Assuming this type is still needed for profile
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faJs, 
  faReact, 
  faNode, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faCloud, 
  faCode, 
  faGlobe,
  faUserShield,
  faPaintBrush
} from '@fortawesome/free-solid-svg-icons';

// Metadata can be exported from Server Components directly in Next.js 13+ App Router
export const metadata = {
  title: "About Me | Skiddle's Blog",
  description: 'Learn more about me, my work, and my interests in technology and development.',
};

// Component is now an async function to fetch data server-side
export default async function AboutPage() { 
  let profile: AppBskyActorDefs.ProfileViewDetailed | null = null;
  let fetchError: string | null = null;

  try {
    // Call getProfile to fetch data. ATP_DID must be set in the environment.
    profile = await getProfile();
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    fetchError = error instanceof Error ? error.message : "An unknown error occurred.";
    // profile remains null, UI should handle this
  }

  const skills = [
    { name: 'JavaScript/TypeScript', icon: faJs, color: 'text-yellow-500' },
    { name: 'React', icon: faReact, color: 'text-blue-400' },
    { name: 'Node.js', icon: faNode, color: 'text-green-500' },
    { name: 'ATProtocol', icon: faCloud, color: 'text-sky-500' },
    { name: 'Web Development', icon: faGlobe, color: 'text-purple-500' },
    { name: 'Decentralized Systems', icon: faCode, color: 'text-indigo-500' }
  ];

  const interests = [
    { name: 'Decentralized Social Networks', icon: faCloud, color: 'text-blue-400' },
    { name: 'Open Source Development', icon: faGithub, color: 'text-gray-500' },
    { name: 'Web Technologies', icon: faCode, color: 'text-green-500' },
    { name: 'User Experience Design', icon: faPaintBrush, color: 'text-pink-500' },
    { name: 'Digital Privacy & Security', icon: faUserShield, color: 'text-red-500' }
  ];

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error Loading Profile</h1>
        <p className="text-xl text-primary mb-4">
          Could not fetch profile information. Please try again later.
        </p>
        <p className="text-md text-secondary">{fetchError}</p>
      </div>
    );
  }

  if (!profile) {
    // This case might occur if getProfile returns null/undefined without throwing an error
    // or if an error occurred but wasn't caught as expected.
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Profile Not Available</h1>
        <p className="text-xl text-primary mb-4">
          Profile information could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          {profile?.avatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar} // Using fetched profile data
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
          )}
          <div>
            <h1 className="text-4xl font-bold text-primary mb-4">About Me</h1>
            <p className="text-xl text-primary mb-4">
              {/* Display actual name if available, otherwise fallback */}
              Hi! I'm {profile?.displayName || 'Skiddle'}, a passionate developer and technology enthusiast.
            </p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Background</h2>
          <p className="text-lg text-primary mb-4">
            {/* Display actual description if available, otherwise fallback */}
            {profile?.description?.split('\n')[0] || 
             `I specialize in web development and decentralized technologies, with a particular
             focus on the ATProtocol ecosystem. My journey in tech has been driven by a
             desire to create meaningful and impactful solutions.`
            }
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-tertiary text-primary p-4 rounded-lg flex items-center gap-3 hover:bg-secondary transition-colors duration-200"
              >
                <FontAwesomeIcon icon={skill.icon} className={`w-5 h-5 ${skill.color}`} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-4">Current Focus</h2>
          <p className="text-lg text-primary mb-4">
            I'm currently working on various projects in the decentralized social media
            space, with a particular emphasis on building tools and applications for the
            Bluesky ecosystem.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Interests</h2>
          <ul className="space-y-3">
            {interests.map((interest) => (
              <li 
                key={interest.name}
                className="flex items-center gap-3 text-lg text-primary"
              >
                <FontAwesomeIcon icon={interest.icon} className={`w-5 h-5 ${interest.color}`} />
                {interest.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
