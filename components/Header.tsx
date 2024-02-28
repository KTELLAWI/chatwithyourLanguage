import { getServerSession } from "next-auth";
import { DarkModeToggle } from "./DarkModeToggle";
import Logo from "./Logo";
import UserButtons from "./UserButtons";
import Link from "next/link";
import { MessageSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./ui/upgradeBanner";

const Header = async () => {
  const session = await getServerSession();
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-grey shadow-md shadow-grey-200 rounded-lg dark:bg-slate-800  dark:shadow-md dark:shadow-grey-100 max-7xl mx-auto">
        <Logo />
        <div className="flex-1 flex items-center justify-end space-x-4">
          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessageSquareIcon className="text-black dark:text-white"/>
                
              </Link>
              <CreateChatButton/>
            </>
          ):(
            <Link
            href="/pricing"
            
            >Pricing</Link>

          )}
          <DarkModeToggle />
          <UserButtons session = {session} />
        </div>
      </nav>
      <UpgradeBanner/>
    </header>
  );
};

export default Header;