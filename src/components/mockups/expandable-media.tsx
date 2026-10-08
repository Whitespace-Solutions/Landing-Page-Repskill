"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Bungkus screenshot / rekaman layar produk agar bisa dibuka layar penuh (lightbox). Klik aset atau tombol "Full screen"
 * di pojoknya → `<dialog>` modal bawaan browser (fokus terkunci, Esc menutup) dengan latar Shadow Grey buram. Tutup lewat
 * tombol ×, Esc, atau klik di luar aset. Isi besar (`expanded`) baru dirender saat dibuka.
 */
export function ExpandableMedia({
  label,
  children,
  expanded,
}: {
  /** Nama aset untuk pembaca layar, mis. alt screenshot */
  label: string;
  /** Tampilan kecil di halaman */
  children: React.ReactNode;
  /** Tampilan besar di dalam lightbox */
  expanded: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  // Halaman di belakang tidak ikut ter-scroll selama lightbox terbuka
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <div className="group relative cursor-zoom-in" onClick={show}>
        {children}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            show();
          }}
          aria-haspopup="dialog"
          aria-label={`View full screen: ${label}`}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-brand-grey/80 px-3 py-1.5 text-xs font-semibold text-white shadow-pop backdrop-blur-sm transition-colors group-hover:bg-brand-grey focus-visible:bg-brand-grey"
        >
          <ExpandIcon />
          Full screen
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={label}
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-transparent p-0 opacity-0 transition-[opacity,display,overlay] transition-discrete duration-200 backdrop:bg-brand-grey/85 backdrop:backdrop-blur-sm open:opacity-100 motion-reduce:transition-none starting:open:opacity-0"
      >
        <div
          className="flex size-full items-center justify-center p-4 pt-16 sm:p-10 sm:pt-16"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          {open && expanded}
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close full screen"
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-white text-brand-grey shadow-pop transition-colors hover:bg-brand-linen"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}
