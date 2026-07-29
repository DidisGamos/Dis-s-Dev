import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  imageClassName?: string;
}

export function Logo({ className = "", imageClassName = "w-10" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src={logoImg} alt="Dis's Dev Logo" className={imageClassName} />
      <span className="text-lg font-semibold tracking-tight">
        Dis's <span className="text-brand">Dev</span>
      </span>
    </div>
  );
}
