// Icons
import Logo from "@/ui/svg/Logo";
import Settings from "@/ui/svg/Settings";


export default function Header() {
  return (
    <header className="fixed top-0 left-0 flex justify-center items-center py-4 px-5 w-full h-24 bg-secondary shadow-header">
      <div className="absolute top-1/2 -translate-y-1/2 left-5 flex justify-center items-center cursor-pointer">
        <Settings className="h-14 w-auto fill-dark" />
      </div>
      <div className="flex justify-center items-center gap-x-8 h-full">
        <Logo className="h-full w-auto fill-dark" />
        <label className="text-4xl text-center font-bold whitespace-nowrap">Staff Editor</label>
      </div>
    </header>
  );
}