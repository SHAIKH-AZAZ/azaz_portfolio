'use client';

import { useState } from 'react';

export default function ContactEmail({ email }) {
  const [copying, setCopying] = useState(false);
  const [status, setStatus] = useState('');

  const copyEmail = async () => {
    setCopying(true);
    setStatus('');
    try {
      await navigator.clipboard.writeText(email);
      setStatus('Email copied to clipboard.');
    } catch {
      setStatus('Could not copy automatically. Select and copy the email address, or open the email link.');
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="contact-email">
      <div className="contact-email-row">
        <a href={`mailto:${email}`}>{email}</a>
        <button
          type="button"
          className="button button-secondary contact-email-copy"
          onClick={copyEmail}
          disabled={copying}
        >
          {copying ? 'Copying…' : 'Copy email'}
        </button>
      </div>
      <p className="contact-email-status" role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </div>
  );
}
