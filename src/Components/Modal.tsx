import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
}

const Modal = ({ isOpen, onClose, movieTitle }: ModalProps) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [datetime, setDatetime] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString().slice(0, 16); // Remove seconds and milliseconds
    setCurrentDateTime(isoString);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name,
      email,
      secondName,
      message,
      datetime,
      movieTitle,
    };

    try {
      const response = await fetch('https://watchmovies.zapto.org/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.success);
        onClose(); // Close the modal on success
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('An error occurred while sending the email');
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 h-full"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-semibold mb-4">Invite your friend or partner</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name of the movie
              </label>
              <input
                type="text"
                id="movieTitle"
                name="movieTitle"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled
                value={movieTitle}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Friend or partner's email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="secondName">
                Friend or partner's name
              </label>
              <input
                type="text"
                id="secondName"
                name="secondName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter name"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="datetime">
                Select Date and Time
              </label>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                min={currentDateTime}
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-400 hover:bg-red-600 rounded-md shadow-md p-2 text-white text-lg font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out lg:px-4"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-[#003366] rounded-md shadow-md p-2 text-white hover:bg-sky-600 text-lg font-bold active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out lg:px-4"
              >
                Let's watch together
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
