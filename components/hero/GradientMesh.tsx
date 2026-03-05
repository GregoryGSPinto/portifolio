'use client';

export default function GradientMesh() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Static fallback for prefers-reduced-motion handled by globals.css */}
      <div
        className="hero-blob hero-blob-1"
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(110,231,183,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'blobDrift1 20s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob hero-blob-2"
        style={{
          position: 'absolute',
          width: '50%',
          height: '50%',
          bottom: '-5%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'blobDrift2 25s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob hero-blob-3"
        style={{
          position: 'absolute',
          width: '40%',
          height: '40%',
          top: '30%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'blobDrift3 22s ease-in-out infinite',
        }}
      />
      <div
        className="hero-blob hero-blob-4"
        style={{
          position: 'absolute',
          width: '35%',
          height: '35%',
          bottom: '20%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'blobDrift4 18s ease-in-out infinite',
        }}
      />
    </div>
  );
}
