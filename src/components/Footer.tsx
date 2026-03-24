import clsx from "clsx";

interface Props {
  isDark: boolean;
}

export default function Footer({ isDark }: Props) {
  return (
    <footer
      className={clsx(
        "py-6 border-t text-center",
        isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white",
      )}
    >
      <p
        className={clsx(
          "text-sm",
          isDark ? "text-slate-400" : "text-slate-500",
        )}
      >
        © {new Date().getFullYear()} Made with{" "}
        <span className="text-red-400">♥</span> by{" "}
        <span className="gradient-text font-medium">Ankit Deshpande</span>
      </p>
    </footer>
  );
}
