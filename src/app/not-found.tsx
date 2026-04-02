import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>🔍</div>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          marginBottom: "1rem",
        }}
        className="gradient-text"
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          maxWidth: 400,
          marginBottom: "2rem",
          lineHeight: 1.7,
        }}
      >
        The product or page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link href="/products" className="btn-primary">
        Browse All Products
      </Link>
    </div>
  );
}
