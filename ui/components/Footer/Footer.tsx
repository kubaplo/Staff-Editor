'use client';

export default function Footer() {
  return (
    <a
      href="https://github.com/kubaplo/Staff-Editor"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-0 left-0 flex justify-center items-center py-1 px-5 w-full h-25 bg-[#5C715E] shadow-header z-10"
    >
      <div className="flex flex-col items-center text-center">
        <p className="text-white text-sm font-medium">
            © 2024 Jakub Płocidem, Jan Mierzwa, Patryk Benecki, Mateusz Roździński
        </p>
        <p className="text-white text-xs font-medium">
            Projekt na licencji MIT
        </p>
        <div className="flex items-center gap-2 mt-2">
            <img
                src="/GitHub_logo.svg"
                alt="GitHub Icon"
                className="h-6 w-6"
            />
            <span className="text-white text-sm font-medium">
            Sprawdź kod źródłowy
            </span>
        </div>
      </div>
    </a>
  );
}