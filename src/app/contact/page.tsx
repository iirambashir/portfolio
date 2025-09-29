'use client';

import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-16 flex justify-center bg-gradient-to-br from-pinkLight via-cream to-blueSoft dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="max-w-7xl w-full p-6">
        <ContactForm />
      </div>
    </main>
  );
}
